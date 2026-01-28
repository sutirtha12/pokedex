"use client";

import { useState } from "react";
import { api } from "~/trpc/react";
import { PokemonTypeSelection } from "./PokemonTypeSelection";
import { PokedexTable } from "./PokedexTable";
import { Box, CircularProgress, Fade } from "@mui/material";

export const FilterablePokedexTable = () => {
    const [selectedType, setSelectedType] = useState<string | undefined>(undefined);

    const { data: pokemons, isLoading } = api.pokemon.getAllPokemon.useQuery(
        selectedType ? { type: selectedType } : undefined
    );

    return (
        <Box>
            <PokemonTypeSelection
                selectedType={selectedType}
                selectType={(type) => setSelectedType(type)}
            />

            {isLoading ? (
                <Box display="flex" justifyContent="center" p={8}>
                    <CircularProgress />
                </Box>
            ) : (
                <Fade in={!isLoading}>
                    <Box>
                        <PokedexTable pokemons={pokemons ?? []} />
                    </Box>
                </Fade>
            )}
        </Box>
    );
};
