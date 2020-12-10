import PropTypes from "prop-types";

const RecipeItem = ({ recipe }) => {
  const { image, label, url } = recipe.recipe;
  return (
    <div className="card text-center">
      <img src={image} alt="" style={{ width: "20vh" }} />
      <h3>{label}</h3>
      <div>
        <a href={url} className="btn btn-dark btn-sm my-1">
          Recipe
        </a>
      </div>
    </div>
  );
};

RecipeItem.protoTypes = {
  recipe: PropTypes.object.isRequired,
};

export default RecipeItem;
