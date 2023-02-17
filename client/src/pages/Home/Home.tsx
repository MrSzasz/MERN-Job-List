import Grid from "@mui/material/Grid";
import Form from "../../components/Form/Form";

const Home = () => {
  return (
    <Grid container height={"100svh"}>
      <Grid
        item
        sx={{
          display: { xs: "none", sm: "none", md: "block" },
          backgroundImage: "url('https://picsum.photos/1280/720')",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
        md={7}
        border={1}
      />
      <Grid item xs={12} md={5} border={1}>
        <Form />
      </Grid>
    </Grid>
  );
};

export default Home;
