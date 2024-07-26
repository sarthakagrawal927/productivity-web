"use client";
import { FoodItem } from '@/types';
import React from 'react';
import FoodItemForm from './FoodItemForm';
import FoodItemList from './FoodItemList';
import HistoricalFoodLogs from './HistoricalFoodLogs';

const FoodClient = ({ foodItems, historicalFoodLogs }: { foodItems: FoodItem[], historicalFoodLogs: FoodItem[] }) => {
  const [consumablesList, setConsumablesList] = React.useState<FoodItem[]>(foodItems);

  const addNewConsumable = (consumable: FoodItem) => {
    setConsumablesList([...consumablesList, consumable]);
  }

  return (
    <>
      <HistoricalFoodLogs historicalFoodLogs={historicalFoodLogs} />
      <FoodItemList foodItems={consumablesList} />
      <FoodItemForm addNewConsumable={addNewConsumable} />
    </>
  );
};

export default FoodClient;