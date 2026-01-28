"use client";

import { api } from "~/trpc/react";
import { Chip, Box, Skeleton } from "@mui/material";

type PokemonTypeSelectionProps = {
    selectedType: string | undefined;
    selectType: (type: string | undefined) => void;
};

export const PokemonTypeSelection = ({ selectedType, selectType }: PokemonTypeSelectionProps) => {
    const { data: types, isLoading } = api.pokemon.getTypes.useQuery();

    if (isLoading) {
        return (
            <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
                <Skeleton variant="rounded" width={60} height={32} />
                <Skeleton variant="rounded" width={80} height={32} />
                <Skeleton variant="rounded" width={80} height={32} />
            </Box>
        )
    }

    return (
        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 3 }}>
            <Chip
                label="All"
                onClick={() => selectType(undefined)}
                color={!selectedType ? "primary" : "default"}
                variant={!selectedType ? "filled" : "outlined"}
                clickable
            />
            {types?.map((t) => (
                <Chip
                    key={t.id}
                    label={t.name}
                    onClick={() => selectType(t.name)}
                    color={selectedType === t.name ? "primary" : "default"}
                    variant={selectedType === t.name ? "filled" : "outlined"}
                    clickable
                    sx={{ textTransform: "capitalize" }}
                />
            ))}
        </Box>
    );
};
