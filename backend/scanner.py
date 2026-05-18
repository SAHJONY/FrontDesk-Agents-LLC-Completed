"""
AUTONOMOUS BUSINESS SCANNER & CONFIGURATOR
Scrapes a business website and auto-generates AI Agent configuration.
"""
import os
import json
import re
import requests
from bs4 import BeautifulSoup
from typing import Dict, List, Optional
import logging

logger = logging.getLogger("AutoScanner")

class BusinessScanner:
    def __init__(self):
        self.headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }

    def scan(self, url: str) -> Dict:
        """Main entry point: Scan URL and return structured business data."""
        if not url.startswith('http'):
            url = 'https://' + url
        
        logger.info(f"Scanning {url}...")
        
        try:
            response = requests.get(url, headers=self.headers, timeout=10)
            response.raise_for_status()
            soup = BeautifulSoup(response.content, 'html.parser')
            
            # Extract Data
            business_name = self._extract_business_name(soup, url)
            services = self._extract_services(soup)
            about_text = self._extract_about(soup)
            contact_info = self._extract_contact(soup)
            
            return {
                "business_name": business_name,
                "website": url,
                "services": services,
                "about_text": about_text,
                "contact": contact_info,
                "industry": self._guess_industry(services + " " + about_text),
                "tone": self._analyze_tone(about_text)
            }
        except Exception as e:
            logger.error(f"Scan failed: {e}")
            return {"error": str(e)}

    def _extract_business_name(self, soup, url) -> str:
        # Try <title>
        title = soup.title.string if soup.title else ""
        if title:
            return title.split('|')[0].split('-')[0].strip()
        
        # Try meta og:title
        og_title = soup.find('meta', property='og:title')
        if og_title and og_title.get('content'):
            return og_title['content'].strip()
            
        # Fallback to domain
        domain = url.replace('https://', '').replace('http://', '').split('/')[0]
        return domain.split('.')[0].capitalize()

    def _extract_services(self, soup) -> List[str]:
        text = soup.get_text().lower()
        services = []
        
        # Multi-language keyword mapping
        keywords = {
            "plumbing": ["leak", "pipe", "water heater", "drain", "sewer", "plumber", 
                         "fuga", "tubería", "calentador", "fontanero", # Spanish
                         "fuite", "tuyau", "plomberie", "chauffe-eau", # French
                         "leck", "rohr", "klempner", "wasserhahn"], # German
            
            "hvac": ["heating", "cooling", "ac", "furnace", "air conditioner", "hvac",
                     "calefacción", "refrigeración", "climatización", # Spanish
                     "chauffage", "climatisation", "froid", # French
                     "heizung", "kühlung", "klimaanlage"], # German
            
            "electrician": ["electric", "wiring", "power", "outlet", "lighting", "panel",
                            "eléctrico", "cableado", "luz", "energía", # Spanish
                            "électrique", "câblage", "lumière", # French
                            "elektrisch", "verdrahtung", "strom"], # German
            
            "roofing": ["roof", "shingle", "gutter", "techo", "tejado", "toiture", "dach"],
            
            "landscaping": ["lawn", "garden", "tree", "landscape", "mowing", "jardín", "paisaje", "jardinage", "garten"]
        }
        
        found_industries = []
        for industry, words in keywords.items():
            if any(word in text for word in words):
                found_industries.append(industry)
                
        return found_industries if found_industries else ["general_contractor"]

    def _extract_about(self, soup) -> str:
        # Look for "About" sections
        about_keywords = ["about", "our story", "who we are", "family owned"]
        text_content = soup.get_text()
        
        # Simple extraction: find paragraph containing keywords
        for p in soup.find_all('p'):
            p_text = p.get_text().lower()
            if any(kw in p_text for kw in about_keywords):
                return p.get_text().strip()[:500] # Limit length
                
        return text_content[:500] # Fallback

    def _extract_contact(self, soup) -> Dict:
        phone = ""
        email = ""
        
        # Phone patterns
        phone_patterns = [r'\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}']
        for pattern in phone_patterns:
            match = re.search(pattern, soup.get_text())
            if match:
                phone = match.group()
                break
                
        # Email patterns
        email_pattern = r'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}'
        match = re.search(email_pattern, soup.get_text())
        if match:
            email = match.group()
            
        return {"phone": phone, "email": email}

    def _guess_industry(self, text: str) -> str:
        text = text.lower()
        if any(w in text for w in ["plumb", "leak", "pipe"]): return "plumber"
        if any(w in text for w in ["hvac", "heating", "cooling", "ac"]): return "hvac"
        if any(w in text for w in ["electric", "wire", "power"]): return "electrician"
        return "general_contractor"

    def _analyze_tone(self, text: str) -> str:
        text = text.lower()
        if any(w in text for w in ["family", "trusted", "honest", "local"]):
            return "friendly_and_trustworthy"
        if any(w in text for w in ["emergency", "24/7", "fast", "immediate"]):
            return "urgent_and_professional"
        return "professional"

    def generate_agent_config(self, scan_data: Dict) -> Dict:
        """Generates the full JSON config for the AI Agent."""
        industry = scan_data.get('industry', 'general_contractor')
        name = scan_data.get('business_name', 'Unknown Business')
        services = ", ".join(scan_data.get('services', ['general services']))
        tone = scan_data.get('tone', 'professional')
        
        prompt = f"""
ROLE: You are the AI Receptionist for {name}.
LANGUAGE: Detect the caller's language automatically (English, Spanish, French, German, Mandarin, etc.) and respond in that same language.
TONE: {tone.capitalize()}, helpful, and efficient.
SERVICES: {services}.

INSTRUCTIONS:
1. Greet callers warmly mentioning {name}.
2. Detect the language the caller is speaking and reply in that same language.
3. Qualify their need based on our services: {services}.
4. If it's an emergency (leak, no power, etc.), flag as CRITICAL.
5. Collect: Name, Address, Phone, Issue.
6. Book appointments or dispatch emergency teams.

RULES:
- NEVER invent prices.
- ALWAYS confirm the address.
- If unsure, say "I'll have a specialist call you back" (in the caller's language).
"""
        
        return {
            "business_name": name,
            "industry": industry,
            "services": services,
            "tone": tone,
            "website": scan_data.get('website'),
            "contact": scan_data.get('contact', {}),
            "system_prompt": prompt,
            "status": "pending_payment"
        }

# Test runner
if __name__ == "__main__":
    scanner = BusinessScanner()
    data = scanner.scan("https://www.joesplumbing.com") # Example
    print(json.dumps(data, indent=2))
