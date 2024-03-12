from logic import *

AKnight = Symbol("A is a Knight")
AKnave = Symbol("A is a Knave")

BKnight = Symbol("B is a Knight")
BKnave = Symbol("B is a Knave")

CKnight = Symbol("C is a Knight")
CKnave = Symbol("C is a Knave")

# Puzzle 0
# A says "I am both a knight and a knave."
knowledge0 = And(
    Or(Not(AKnight), AKnave),  # Se A é um cavaleiro, então a declaração é uma contradição, o que não pode ser.
    Implication(AKnight, Not(AKnave)),  # Se A é um cavaleiro, então A não pode ser um vilão.
    Implication(AKnave, Not(AKnight))  # Se A é um vilão, então A não pode ser um cavaleiro.
)

# Puzzle 1
# A says "We are both knaves."
# B says nothing.
knowledge1 = And(
    Implication(AKnight, BKnave),  # Se A é um cavaleiro, então a afirmação de que ambos são vilões é falsa.
    Not(And(AKnight, AKnave)),  # A não pode ser cavaleiro e vilão ao mesmo tempo.
    Not(And(BKnight, BKnave))  # B não pode ser cavaleiro e vilão ao mesmo tempo.
)

# Puzzle 2
# A says "We are the same kind."
# B says "We are of different kinds."
knowledge2 = And(
    Or(Implication(AKnight, BKnight), Implication(AKnave, BKnave)),  # Se A é um cavaleiro, então B é do mesmo tipo; se A é um vilão, então B é do mesmo tipo também.
    Or(Implication(BKnight, AKnave), Implication(BKnave, AKnight)),  # Se B é um cavaleiro, então A é de um tipo diferente; se B é um vilão, então A é do mesmo tipo.
    Not(And(AKnight, AKnave)),  # A não pode ser cavaleiro e vilão ao mesmo tempo.
    Not(And(BKnight, BKnave))  # B não pode ser cavaleiro e vilão ao mesmo tempo.
)

# Puzzle 3
# A says either "I am a knight." or "I am a knave.", but you don't know which.
# B says "A said 'I am a knave'."
# B says "C is a knave."
# C says "A is a knight."
knowledge3 = And(
    Or(Implication(AKnight, Not(AKnave)), Implication(AKnave, Not(AKnight))),  # A não pode ser ambos.
    Biconditional(BKnight, And(Implication(AKnight, AKnave), CKnave)),  # B é um cavaleiro se A for um vilão (segundo B) e C for um vilão.
    Implication(CKnight, AKnight),  # Se C é um cavaleiro, então A também é.
    Not(And(AKnight, AKnave)),  # A não pode ser cavaleiro e vilão ao mesmo tempo.
    Not(And(BKnight, BKnave)),  # B não pode ser cavaleiro e vilão ao mesmo tempo.
    Not(And(CKnight, CKnave))  # C não pode ser cavaleiro e vilão ao mesmo tempo.
)


def main():
    symbols = [AKnight, AKnave, BKnight, BKnave, CKnight, CKnave]
    puzzles = [
        ("Puzzle 0", knowledge0),
        ("Puzzle 1", knowledge1),
        ("Puzzle 2", knowledge2),
        ("Puzzle 3", knowledge3)
    ]
    for puzzle, knowledge in puzzles:
        print(puzzle)
        if len(knowledge.conjuncts) == 0:
            print("    Not yet implemented.")
        else:
            for symbol in symbols:
                if model_check(knowledge, symbol):
                    print(f"    {symbol}")


if __name__ == "__main__":
    main()
