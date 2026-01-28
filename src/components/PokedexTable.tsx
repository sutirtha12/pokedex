
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Typography } from "@mui/material";
import { PokemonRow } from "./PokemonRow";

interface Pokemon {
    id: number;
    name: string;
    types: string[];
    sprite: string;
}

export const PokedexTable = ({ pokemons }: { pokemons: Pokemon[] }) => {
    if (!pokemons || pokemons.length === 0) {
        return (
            <Paper sx={{ p: 4, textAlign: 'center' }}>
                <Typography>No Pokemon found</Typography>
            </Paper>
        );
    }
    return (
        <TableContainer component={Paper} elevation={0} sx={{ mt: 2, overflow: 'hidden' }}>
            <Table sx={{ minWidth: 650 }} aria-label="pokedex table">
                <TableHead>
                    <TableRow sx={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}>
                        <TableCell width="10%">ID</TableCell>
                        <TableCell width="15%">Sprite</TableCell>
                        <TableCell width="30%">Name</TableCell>
                        <TableCell width="45%">Type</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {pokemons.map((pokemon) => (
                        <PokemonRow key={pokemon.id} pokemon={pokemon} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};
