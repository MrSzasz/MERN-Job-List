import { Button, Container, Grid, TextField, Typography } from "@mui/material";

const Form = () => {
  return (
    <form>
      <Typography>Login</Typography>
      <Grid
        container
        p={4}
        height={"100svh"}
        justifyContent="center"
        alignContent="center"
        columns={1}
        direction="column"
        gap={2}
      >
        <TextField id="outlined-basic" label="Username" variant="outlined" />
        <TextField id="outlined-basic" label="Password" variant="outlined" />
        <Button variant="contained">Log in</Button>
        <Grid
          container
          p={4}
          gap={2}
          alignContent="center"
          justifyContent="center"
        >
          <Grid item xs={12}>
            <Typography textAlign="center">Doesn't have an user?</Typography>
          </Grid>
          <Grid item>
            <Button variant="contained">Log in as Guest</Button>
          </Grid>
          <Grid item>
            <Button variant="contained">Register</Button>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

export default Form;
