import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=False)
        page = await browser.new_page(viewport={'width': 1440, 'height': 900})
        await page.goto('http://localhost:5173/', wait_until='networkidle', timeout=15000)
        await page.wait_for_timeout(2000)
        await page.screenshot(path='c:/Users/ljest/Desktop/Proyectillos/Peluquerías/site_hero.png', full_page=False)
        print('Hero screenshot OK')
        
        # Scroll y más screenshots
        await page.evaluate('window.scrollTo(0, 900)')
        await page.wait_for_timeout(800)
        await page.screenshot(path='c:/Users/ljest/Desktop/Proyectillos/Peluquerías/site_services.png', full_page=False)
        print('Services screenshot OK')
        
        await page.evaluate('window.scrollTo(0, 2000)')
        await page.wait_for_timeout(800)
        await page.screenshot(path='c:/Users/ljest/Desktop/Proyectillos/Peluquerías/site_gallery.png', full_page=False)
        print('Gallery screenshot OK')

        # Consola errors
        errors = []
        page.on('console', lambda msg: errors.append(msg.text) if msg.type == 'error' else None)
        await page.wait_for_timeout(1000)
        if errors:
            print('ERRORES:', errors)
        else:
            print('Sin errores de consola')
        
        await browser.close()

asyncio.run(main())
