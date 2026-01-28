"use client";

import { useState } from "react";
import { api } from "~/trpc/react";
import { Container, TextField, Button, Paper, Typography } from "@mui/material";
import { PokedexTable } from "~/components/PokedexTable";
import Link from "next/link";

export default function Part2() {
    const [inputVal, setInputVal] = useState("Bulbasaur, Charmander, Pikachu");
    const [queryNames, setQueryNames] = useState<string[]>([]);

    const { data: pokemons, isLoading } = api.pokemon.getPokemonArray.useQuery(queryNames, {
        enabled: queryNames.length > 0,
    });

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const names = inputVal.split(",").map(s => s.trim()).filter(Boolean);
        setQueryNames(names);
    };

    return (
        <Container maxWidth="lg" sx={{ py: 8 }}>
            <Button component={Link} href="/" variant="text" sx={{ mb: 2 }}>&larr; Back to Home</Button>
            <Typography variant="h3" gutterBottom fontWeight="bold">Part 2: Multiple Pokemon</Typography>

            <Paper component="form" onSubmit={handleSearch} sx={{ p: 4, mb: 4, display: 'flex', gap: 2, alignItems: 'center' }}>
                <TextField
                    label="Pokemon Names (comma separated)"
                    value={inputVal}
                    onChange={(e) => setInputVal(e.target.value)}
                    fullWidth
                    placeholder="Bulbasaur, Charmander, Squirtle"
                />
                <Button type="submit" variant="contained" size="large" sx={{ px: 4, height: 56 }}>Search</Button>
            </Paper>

            {isLoading ? <Typography>Loading...</Typography> : (
                <PokedexTable pokemons={pokemons ?? []} />
            )}
        </Container>
    );
}
