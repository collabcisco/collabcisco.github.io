from PIL import Image, ImageOps, ImageFilter, ImageDraw

# Cargar logo original
logo_path = "logo.jpg"  # Cambia esto a la ruta de tu archivo
logo = Image.open(logo_path).convert("RGBA")

# Convertir a escala de grises y detectar contornos
gray = logo.convert("L")
edges = gray.filter(ImageFilter.FIND_EDGES)

# Crear imagen de salida transparente
contour_img = Image.new("RGBA", logo.size, (0,0,0,0))
draw = ImageDraw.Draw(contour_img)

# Colores aproximados
azul = (0, 102, 204, 255)
verde = (173, 255, 47, 255)

# Pintar contornos
for y in range(edges.height):
    for x in range(edges.width):
        if edges.getpixel((x, y)) < 200:  # sensibilidad del contorno
            r, g, b, a = logo.getpixel((x, y))
            # Simple aproximación: si pixel tiene más verde → texto, si no → carrito
            if g > r and g > b:
                draw.point((x, y), fill=verde)
            else:
                draw.point((x, y), fill=azul)

# Guardar resultado
output_path = "merka_contorno_minimalista.png"
contour_img.save(output_path)
print(f"Logo guardado en: {output_path}")
