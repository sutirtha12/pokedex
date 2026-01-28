import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    console.log("Start seeding...");

    // Clean up
    await prisma.pokemon.deleteMany();
    await prisma.type.deleteMany();

    const pokemons = [
        { id: 1, name: "Bulbasaur", types: ["grass", "poison"] },
        { id: 2, name: "Ivysaur", types: ["grass", "poison"] },
        { id: 3, name: "Venusaur", types: ["grass", "poison"] },
        { id: 4, name: "Charmander", types: ["fire"] },
        { id: 5, name: "Charmeleon", types: ["fire"] },
        { id: 6, name: "Charizard", types: ["fire", "flying"] },
        { id: 7, name: "Squirtle", types: ["water"] },
        { id: 8, name: "Wartortle", types: ["water"] },
        { id: 9, name: "Blastoise", types: ["water"] },
        { id: 25, name: "Pikachu", types: ["electric"] },
    ];

    for (const p of pokemons) {
        const pokemon = await prisma.pokemon.create({
            data: {
                id: p.id,
                name: p.name,
                sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${p.id}.png`,
                types: {
                    connectOrCreate: p.types.map((t) => ({
                        where: { name: t },
                        create: { name: t },
                    })),
                },
            },
        });
        console.log(`Created pokemon with id: ${pokemon.id}`);
    }
    console.log("Seeding finished.");
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
