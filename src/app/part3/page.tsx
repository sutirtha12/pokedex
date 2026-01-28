"use client";

import { Container, Typography, Button, Paper } from "@mui/material";
import { FilterablePokedexTable } from "~/components/FilterablePokedexTable";
import Link from "next/link";

export default function Part3() {
    return (
        <Container maxWidth="lg" sx={{ py: 8 }}>
            <Button component={Link} href="/" variant="text" sx={{ mb: 2 }}>&larr; Back to Home</Button>
            <Typography variant="h3" gutterBottom fontWeight="bold">Part 3: Filterable Pokedex</Typography>
            <Paper sx={{ p: 4, minHeight: '60vh' }}>
                <FilterablePokedexTable />
            </Paper>
        </Container>
    );
}
