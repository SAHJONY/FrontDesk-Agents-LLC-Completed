"""
SCANNER SERVICE
Autonomous website analysis to extract business details (services, hours, personality).
Supports multi-language keyword detection (EN, ES, FR, DE).
"""
import re
from typing import Dict, List, Optional
import requests
from bs4 import BeautifulSoup

class ScannerService:
    """Scrapes and analyzes customer websites to auto-configure their AI agent."""
    
    # Multi-language keywords for service detection
    KEYWORDS = {
        "services": {
            "en": ["service", "plumbing", "hvac", "electric", "roof", "legal", "medical", "consulting"],
            "es": ["servicio", "plomería", "climatización", "electricidad", "techo", "legal", "médico"],
            "fr": ["service", "plomberie", "climatisation", "électricité", "toit", "juridique", "médical"],
            "de": ["dienstleistung", "klempner", "heizung", "elektrik", "dach", "recht", "medizin"]
        },
        "hours": {
            "en": ["hours", "open", "schedule", "monday", "tuesday", "wednesday", "thursday", "friday"],
            "es": ["horario", "abierto", "lunes", "martes", "miércoles", "jueves", "viernes"],
            "fr": ["horaire", "ouvert", "lundi", "mardi", "mercredi", "jeudi", "vendredi"],
            "de": ["öffnungszeiten", "geöffnet", "montag", "dienstag", "mittwoch", "donnerstag", "freitag"]
        }
    }
    
    def scan_website(self, url: str) -> Dict:
        """
        Scan a website URL and extract business configuration.
        Returns: { services: [], hours: str, personality: str, language: str }
        """
        if not url.startswith("http"):
            url = f"https://{url}"
        
        try:
            response = requests.get(url, timeout=10)
            response.raise_for_status()
            soup = BeautifulSoup(response.text, 'html.parser')
            text = soup.get_text().lower()
            
            # Detect language (simplified)
            lang = "en"
            if any(word in text for word in self.KEYWORDS["services"]["es"]):
                lang = "es"
            elif any(word in text for word in self.KEYWORDS["services"]["fr"]):
                lang = "fr"
            elif any(word in text for word in self.KEYWORDS["services"]["de"]):
                lang = "de"
            
            # Extract services
            services = self._extract_matches(text, "services", lang)
            
            # Extract hours (simplified pattern matching)
            hours = self._extract_hours(text)
            
            # Determine personality based on industry
            personality = "professional"
            if "legal" in text or "law" in text:
                personality = "formal"
            elif "plumbing" in text or "hvac" in text:
                personality = "friendly"
            
            return {
                "services": list(set(services))[:5],  # Limit to 5 unique services
                "hours": hours or "9am-5pm",
                "personality": personality,
                "language": lang,
                "website_url": url
            }
            
        except Exception as e:
            # Fallback for failed scans
            return {
                "services": ["General Inquiry"],
                "hours": "9am-5pm",
                "personality": "professional",
                "language": "en",
                "website_url": url,
                "error": str(e)
            }
    
    def _extract_matches(self, text: str, category: str, lang: str) -> List[str]:
        """Extract matching keywords from text."""
        matches = []
        keywords = self.KEYWORDS.get(category, {}).get(lang, [])
        for word in keywords:
            if word in text:
                matches.append(word)
        return matches
    
    def _extract_hours(self, text: str) -> Optional[str]:
        """Extract business hours using regex patterns."""
        # Pattern: "Mon-Fri: 9am-5pm" or "9:00 AM - 5:00 PM"
        patterns = [
            r'(\d{1,2}:\d{2}\s*(?:am|pm)\s*-\s*\d{1,2}:\d{2}\s*(?:am|pm))',
            r'(\d{1,2}\s*(?:am|pm)\s*-\s*\d{1,2}\s*(?:am|pm))'
        ]
        for pattern in patterns:
            match = re.search(pattern, text, re.IGNORECASE)
            if match:
                return match.group(1)
        return None

# Singleton instance
scanner_service = ScannerService()
