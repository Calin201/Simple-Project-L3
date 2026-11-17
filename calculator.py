def calculeaza(a, b, operatie="adunare"):
    if operatie == "inmultire":
         return a * b
    return a + b

if __name__ == "__main__":
    print(calculeaza(4, 5, "adunare"))
    print(calculeaza(4, 5, "inmultire"))