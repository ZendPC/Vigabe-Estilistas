import re

data = open('c:/Users/ljest/Desktop/Proyectillos/Peluquerías/maps.html', encoding='utf-8').read()

# Buscar cualquier texto con dirección española
# Buscar patrones de dirección
addr = re.findall(r'[Cc]alle\s+[A-Za-záéíóúÁÉÍÓÚñÑ\s,\d]+', data)
print('=== Direcciones ===')
for a in addr[:10]:
    print(' ', a.strip()[:100])

# Buscar teléfonos españoles reales
phones = re.findall(r'(?:6|7|8|9)\d{8}', data)
print('\n=== Teléfonos ===')
seen = set()
for p in phones:
    if p not in seen and not p.startswith('100') and not p.startswith('102') and not p.startswith('116'):
        seen.add(p)
        print(' ', p)

# Buscar fragmentos con "Vigabe" y contexto
idx = data.find('Vigabe Estilistas')
if idx > 0:
    print('\n=== Contexto Vigabe ===')
    print(data[idx-200:idx+500])
