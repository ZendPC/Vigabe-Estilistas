import re

data = open('c:/Users/ljest/Desktop/Proyectillos/Peluquerías/insta.html', encoding='utf-8').read()

patterns = {
    'biography': r'"biography":"([^"]+)"',
    'full_name': r'"full_name":"([^"]+)"',
    'followers': r'"edge_followed_by":\{"count":(\d+)',
    'profile_pic': r'"profile_pic_url_hd":"([^"]+)"',
    'username': r'"username":"([^"]+)"',
    'phone': r'"public_phone_number":"([^"]+)"',
    'email': r'"public_email":"([^"]+)"',
    'address': r'"address_json":"([^"]+)"',
    'city': r'"city_name":"([^"]+)"',
    'category': r'"category_name":"([^"]+)"',
    'website': r'"website":"([^"]+)"',
}

for k, p in patterns.items():
    m = re.search(p, data)
    print(k, ':', m.group(1) if m else 'NOT FOUND')

# Buscar URLs de imágenes publicadas
img_urls = re.findall(r'"display_url":"(https://[^"]+)"', data)
print('\nIMÁGENES ENCONTRADAS:', len(img_urls))
for i, url in enumerate(img_urls[:10]):
    print(f'  img{i+1}:', url[:100])
