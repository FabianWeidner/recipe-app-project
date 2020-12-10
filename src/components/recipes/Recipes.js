import RecipeItem from "./RecipeItem";
import styled from "styled-components/macro";
import Spinner from "../layout/Spinner";
import PropTypes from "prop-types";

const Recipes = ({ recipes, loading }) => {
  if (loading) {
    return <Spinner />;
  } else {
    return (
      <Container>
        {recipes.map((recipe) => (
          <RecipeItem key={recipe.recipe.label} recipe={recipe} />
        ))}
      </Container>
    );
  }
};

Recipes.propTypes = {
  recipes: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
};

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-gap: 1rem;
`;

export default Recipes;
