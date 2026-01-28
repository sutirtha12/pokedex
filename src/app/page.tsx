import Link from "next/link";
import { Container, Typography, Card, CardContent, Grid, Button, Box } from "@mui/material";

export default function Home() {
  return (
    <Container maxWidth="md" sx={{ py: 10 }}>
      <Typography variant="h2" component="h1" gutterBottom align="center" sx={{ fontWeight: 800, mb: 6 }}>
        Pokedex Challenge
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {[
          { id: 1, title: "Part 1: Single Pokemon", desc: "Lookup a single Pokemon by name and display its details." },
          { id: 2, title: "Part 2: Multiple Pokemon", desc: "Lookup multiple Pokemon by names and display them in a table." },
          { id: 3, title: "Part 3: Filterable Pokedex", desc: "View all Pokemon and filter by type." }
        ].map((part) => (
          <Grid key={part.id} size={{ xs: 12, md: 4 }}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', p: 2 }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h5" component="h2" gutterBottom fontWeight="bold">
                  {part.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {part.desc}
                </Typography>
                <Box sx={{ mt: 'auto' }}>
                  <Button
                    component={Link}
                    href={`/part${part.id}`}
                    variant="contained"
                    fullWidth
                    size="large"
                  >
                    Go to Part {part.id}
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
