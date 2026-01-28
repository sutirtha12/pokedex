"use client";

import { useState } from "react";
import { api } from "~/trpc/react";
import { Container, TextField, Button, Paper, Table, TableBody, TableContainer, Typography, Box } from "@mui/material";
import { PokemonRow } from "~/components/PokemonRow";
import Link from "next/link";

export default function Part1() {
    const [name, setName] = useState("Bulbasaur");
    const [query, setQuery] = useState("");

    const { data: pokemon, isError, isLoading } = api.pokemon.getPokemon.useQuery(query, {
        enabled: !!query,
        retry: 1,
    });

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (name.trim()) {
            setQuery(name.trim());
        }
    };

    return (
        <Container maxWidth="md" sx={{ py: 8 }}>
            <Button component={Link} href="/" variant="text" sx={{ mb: 2 }}>&larr; Back to Home</Button>
            <Typography variant="h3" gutterBottom fontWeight="bold">Part 1: Single Pokemon</Typography>

            <Paper component="form" onSubmit={handleSearch} sx={{ p: 4, mb: 4, display: 'flex', gap: 2, alignItems: 'center' }}>
                <TextField
                    label="Pokemon Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    fullWidth
                    variant="outlined"
                />
                <Button type="submit" variant="contained" size="large" sx={{ px: 4, height: 56 }}>Search</Button>
            </Paper>

            {isLoading && <Typography>Loading...</Typography>}

            {pokemon && (
                <TableContainer component={Paper}>
                    <Table>
                        <TableBody>
                            <PokemonRow pokemon={pokemon} />
                        </TableBody>
                    </Table>
                </TableContainer>
            )}

            {isError && <Typography color="error">Pokemon not found</Typography>}
            {!isLoading && !pokemon && query && !isError && <Typography>No Pokemon found</Typography>}
        </Container>
    );
}
