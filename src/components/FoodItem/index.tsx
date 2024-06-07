"use client";
import { DayFoodLogType, FoodItem } from '@/types';
import React from 'react';
import FoodItemForm from './FoodItemForm';
import FoodItemList from './FoodItemList';
import DayFoodLog from './DayFoodLog';

const FoodClient = ({ foodItems, food_consumed, total_food_consumed }: { foodItems: FoodItem[] } & DayFoodLogType) => {
  const [consumablesList, setConsumablesList] = React.useState<FoodItem[]>(foodItems);

  const addNewConsumable = (consumable: FoodItem) => {
    setConsumablesList([...consumablesList, consumable]);
  }

  return (
    <>
      <DayFoodLog food_consumed={food_consumed} total_food_consumed={total_food_consumed} />
      <FoodItemList foodItems={consumablesList} />
      <FoodItemForm addNewConsumable={addNewConsumable} />
    </>
  );
};

export default FoodClient;