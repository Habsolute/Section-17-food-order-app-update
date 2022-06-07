import { useEffect, useState } from "react";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    let url =
      "https://react-http-testing-1d3bc-default-rtdb.firebaseio.com/meals.json";

    const fetchMeals = async () => {
      const resp = await fetch(url);
      const respData = await resp.json();

      const loadedMeals = [];

      for (const key in respData) {
        loadedMeals.push({
          id: key,
          name: respData[key].name,
          description: respData[key].description,
          price: respData[key].price,
        });
      }
      setMeals(loadedMeals);
    };

    fetchMeals();
  }, []);

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
