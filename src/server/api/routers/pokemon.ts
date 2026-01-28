import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const pokemonRouter = createTRPCRouter({
    getPokemon: publicProcedure
        .input(z.string())
        .query(async ({ ctx, input }) => {
            // Try to find by name (case insensitive if possible, or usually just exact match for now)
            // SQLite 'mode: insensitive' support depends on collation, but typically Prisma handles it or we assume title case if seeded that way.
            // Let's try exact match first for simplicity, or Capitalize input.
            const pokemon = await ctx.db.pokemon.findFirst({
                where: {
                    name: input
                },
                include: { types: true },
            });

            if (!pokemon) return null;

            return {
                id: pokemon.id,
                name: pokemon.name,
                sprite: pokemon.sprite,
                types: pokemon.types.map((t) => t.name),
            };
        }),

    getPokemonArray: publicProcedure
        .input(z.array(z.string()))
        .query(async ({ ctx, input }) => {
            const pokemons = await ctx.db.pokemon.findMany({
                where: {
                    name: { in: input },
                },
                include: { types: true },
            });

            return pokemons.map((p) => ({
                id: p.id,
                name: p.name,
                sprite: p.sprite,
                types: p.types.map((t) => t.name),
            }));
        }),

    getAllPokemon: publicProcedure
        .input(z.object({ type: z.string().optional() }).optional())
        .query(async ({ ctx, input }) => {
            const where = input?.type && input.type !== "all"
                ? {
                    types: {
                        some: {
                            name: input.type,
                        },
                    },
                }
                : undefined;

            const pokemons = await ctx.db.pokemon.findMany({
                where,
                include: { types: true },
            });

            return pokemons.map((p) => ({
                id: p.id,
                name: p.name,
                sprite: p.sprite,
                types: p.types.map((t) => t.name),
            }));
        }),

    getTypes: publicProcedure.query(async ({ ctx }) => {
        return ctx.db.type.findMany();
    }),
});
