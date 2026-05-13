import re

data = open('c:/Users/ljest/Desktop/Proyectillos/Peluquerías/maps.html', encoding='utf-8').read()

# Buscar todos los fragmentos después de "Vigabe Estilistas"
positions = [m.start() for m in re.finditer('Vigabe', data)]
print(f'Ocurrencias de Vigabe: {len(positions)}')

for pos in positions[:5]:
    snippet = data[pos:pos+300]
    # Limpiar un poco
    snippet = re.sub(r'\\u([0-9a-fA-F]{4})', lambda m: chr(int(m.group(1), 16)), snippet)
    print(f'\n--- pos {pos} ---')
    print(snippet[:300])
