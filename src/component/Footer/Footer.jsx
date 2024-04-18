import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Link } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import { useSelector } from "react-redux";
import { CoPresentSharp } from "@mui/icons-material";

function Copyright() {
  return (
    <Typography variant="body2" color="rgba(241, 241, 241, 0.868)">
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const defaultTheme = createTheme({
  typography: {
    body1: {
      color: "white",
    },
  },
});

const getRandomCities = (cities, numCities) => {
  const shuffledCities = [...cities];

  for (let i = shuffledCities.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledCities[i], shuffledCities[j]] = [
      shuffledCities[j],
      shuffledCities[i],
    ];
  }

  return shuffledCities.slice(0, numCities);
};

export default function Footer() {
  const { cities, state_cities } = useSelector((state) => state.cities);
  let randomCities = getRandomCities(state_cities, 5);
  console.log(randomCities);
  return (
    <ThemeProvider theme={defaultTheme}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh", // Ensure footer sticks to the bottom
        }}
      >
        <CssBaseline />

        <Box
          component="footer"
          sx={{
            py: 3,
            px: 2,
            mt: "auto",
            backgroundColor: (theme) =>
              theme.palette.mode === "dark"
                ? theme.palette.grey[200]
                : theme.palette.grey[800],
          }}
        >
          <Container className="d-flex justify-content-evenly">
            {/* Cities Section */}
            <div className="section-1">
              <Typography variant="h6" gutterBottom>
                Cities
              </Typography>
              <div className="grey">
                {randomCities &&
                  randomCities.map((city) => (
                    <Link className="text-decoration-none cities-name">
                      <Typography
                        variant="body1"
                        className="grey  "
                        key={city.id}

                      >
                        {city.name}
                      </Typography>
                    </Link>
                  ))}
              </div>
            </div>

            {/* Policy and Conditions Section */}
            <Box>
              <Typography variant="h6" gutterBottom>
                Policy and Conditions
              </Typography>
              <div className="text-center">
                <Typography variant="body1" className="grey">
                  Terms & Conditions
                </Typography>
                <Typography variant="body1" className="grey">
                  Privacy Policy
                </Typography>
                <Typography variant="body1" className="grey">
                  About
                </Typography>
                <Typography variant="body1" className="grey">
                  Contact
                </Typography>
              </div>
            </Box>

            {/* Social Profile Section */}
            <Box>
              <Typography variant="h6" gutterBottom>
                Social Profiles
              </Typography>
              <IconButton
                color="inherit"
                aria-label="Facebook"
                href="https://www.facebook.com/example"
                target="_blank"
              >
                <FacebookIcon />
              </IconButton>
              <IconButton
                color="inherit"
                aria-label="Twitter"
                href="https://twitter.com/example"
                target="_blank"
              >
                <TwitterIcon />
              </IconButton>
              <IconButton
                color="inherit"
                aria-label="Instagram"
                href="https://www.instagram.com/example"
                target="_blank"
              >
                <InstagramIcon />
              </IconButton>
            </Box>
          </Container>
          <Copyright />
        </Box>
      </Box>
    </ThemeProvider>
  );
}
