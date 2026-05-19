#!/usr/bin/env python3
"""
TWILIO READINESS CHECK
Run this script to verify your Twilio configuration is ready for real business.
Usage: python check_twilio.py
"""
import os
import sys
from dotenv import load_dotenv

# Load env vars
load_dotenv()

def check_twilio():
    print("📞 TWILIO READINESS AUDIT")
    print("=" * 40)
    
    # 1. Check Credentials
    sid = os.getenv('TWILIO_SID')
    token = os.getenv('TWILIO_TOKEN')
    from_num = os.getenv('TWILIO_FROM_NUMBER')
    
    if not all([sid, token, from_num]):
        print("❌ CRITICAL: Missing Twilio credentials in .env file.")
        print("   Please edit .env and add:")
        print("   - TWILIO_SID")
        print("   - TWILIO_TOKEN")
        print("   - TWILIO_FROM_NUMBER")
        return False
    
    print(f"✅ Credentials Loaded")
    print(f"   Account SID: {sid[:6]}...{sid[-4:]}")
    print(f"   Phone Number: {from_num}")
    
    # 2. Test Connection
    try:
        from twilio.rest import Client
        client = Client(sid, token)
        
        # Fetch Account
        account = client.api.accounts(sid).fetch()
        print(f"✅ Connection: Successful")
        print(f"   Account: {account.friendly_name}")
        print(f"   Status: {account.status}")
        
        # Check Balance
        try:
            balance = client.api.accounts(sid).balances.fetch()
            bal_amount = float(balance.balance)
            print(f"💰 Balance: {balance.balance} {balance.currency}")
            if bal_amount < 10.0:
                print("   ⚠️  WARNING: Balance is low (< $10). Top up required for production!")
                return False
            else:
                print("   ✅ Balance Sufficient")
        except Exception as e:
            print(f"   ⚠️  Could not fetch balance: {e}")
        
        # 3. Verify Phone Number
        try:
            numbers = client.incoming_phone_numbers.list(phone_number=from_num)
            if numbers:
                print(f"✅ Phone Number: Verified ({from_num})")
                print(f"   Voice URL: {numbers[0].voice_url or 'Not Configured'}")
                print(f"   SMS URL: {numbers[0].sms_url or 'Not Configured'}")
            else:
                print(f"❌ Phone Number: {from_num} not found in this account.")
                print("   Did you purchase this number in Twilio?")
                return False
        except Exception as e:
            print(f"❌ Phone Number Verification Failed: {e}")
            return False
            
        return True
        
    except ImportError:
        print("❌ Library Missing: Install with 'pip install twilio'")
        return False
    except Exception as e:
        print(f"❌ Connection Failed: {str(e)}")
        print("   Check your SID and Token.")
        return False

if __name__ == "__main__":
    success = check_twilio()
    if success:
        print("\n🚀 STATUS: READY FOR BUSINESS")
        print("   Your AI agents can now make/receive calls.")
        sys.exit(0)
    else:
        print("\n🛑 STATUS: NOT READY")
        print("   Fix the errors above before launching.")
        sys.exit(1)
