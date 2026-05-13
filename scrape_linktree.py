import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()
        await page.goto('https://linktr.ee/vigabeestilistas', wait_until='networkidle', timeout=20000)
        await page.wait_for_timeout(3000)
        text = await page.inner_text('body')
        print(text[:3000])
        # Buscar links
        links = await page.query_selector_all('a[href]')
        print('\n=== LINKS ===')
        for link in links:
            href = await link.get_attribute('href')
            txt = await link.inner_text()
            if href and ('wa.me' in href or 'whatsapp' in href.lower() or 'api.whatsapp' in href):
                print(f'WHATSAPP: {href} | {txt}')
            elif href and href.startswith('http'):
                print(f'{txt.strip()[:40]} -> {href[:80]}')
        await browser.close()

asyncio.run(main())
