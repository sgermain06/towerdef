const Hexagon = (x: number, y: number, size: number): number[] => {
    
    const angle = Math.PI / 3;
    const height = Math.sin(angle) * size;
    const halfSize = size / 2;
    
    const xOffset = x - size
    const yOffset = y + (size - height);
    
    const points = [
        xOffset + halfSize, yOffset - size,
        xOffset + size + halfSize, yOffset - size,
        xOffset + size * 2, yOffset - size + height,
        xOffset + size + halfSize, yOffset - size + height * 2,
        xOffset + halfSize, yOffset - size + height * 2,
        xOffset, yOffset - size + height
    ]
    
    return points;
}

export default Hexagon;
