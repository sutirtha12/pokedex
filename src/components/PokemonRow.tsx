
import { TableRow, TableCell, Avatar, Chip, Box, Typography } from "@mui/material";

interface Pokemon {
    id: number;
    name: string;
    types: string[];
    sprite: string;
}

export const PokemonRow = ({ pokemon }: { pokemon: Pokemon }) => {
    return (
        <TableRow
            hover
            sx={{
                '&:last-child td, &:last-child th': { border: 0 },
                transition: 'all 0.2s',
                '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.05) !important'
                }
            }}
        >
            <TableCell>{pokemon.id}</TableCell>
            <TableCell>
                <Avatar
                    src={pokemon.sprite}
                    alt={pokemon.name}
                    sx={{ width: 56, height: 56 }}
                    variant="rounded"
                />
            </TableCell>
            <TableCell>
                <Typography variant="h6" component="span" fontWeight="600">
                    {pokemon.name}
                </Typography>
            </TableCell>
            <TableCell>
                <Box sx={{ display: 'flex', gap: 1 }}>
                    {pokemon.types.map((t) => (
                        <Chip
                            key={t}
                            label={t}
                            size="small"
                            color="primary"
                            variant="outlined"
                            sx={{ textTransform: 'capitalize' }}
                        />
                    ))}
                </Box>
            </TableCell>
        </TableRow>
    );
};
