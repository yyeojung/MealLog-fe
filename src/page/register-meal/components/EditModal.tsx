"use client";

import SelectedEditMeal from "@/components/page/SelectedEditMeal";
import { Button } from "@/components/shared";
import { Drawer, DrawerClose, DrawerContent, DrawerFooter } from "@/components/ui/drawer";
import type { Food, MealPayload } from "@/types/Meal";
import { deleteMeal, getMyMeal, updateMeal } from "@/features/meal/mealSlice";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/features/store";
import { useState } from "react";
import { DialogTitle } from "@radix-ui/react-dialog";

interface EditModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  mealList: MealPayload[];
  isoDate: string;
  selectedMealTab: "breakfast" | "lunch" | "dinner" | "snack";
}

const EditModal = ({ open, setOpen, isoDate, selectedMealTab }: EditModalProps) => {
  const { meals } = useSelector((state: RootState) => state.meal);
  const [foods, setFoods] = useState<Food[]>(meals[0]?.foods ?? []);

  const dispatch = useDispatch<AppDispatch>();

  const handleSave = async () => {
    try {
      if (foods.length === 0) {
        await dispatch(deleteMeal({ mealId: meals[0]._id! }));
      } else {
        await dispatch(
          updateMeal({
            mealId: meals[0]._id!,
            data: {
              ...meals[0],
              foods: foods.map((item, index) => {
                const originalFood = meals[0].foods[index];
                return {
                  ...originalFood,
                  ...item,
                  nutrients: {
                    ...originalFood.nutrients,
                    ...item.nutrients,
                  },
                };
              }),
            },
          }),
        );
      }
      alert("수정 되었습니다.");
      setOpen(false);
      await dispatch(getMyMeal({ date: isoDate, type: selectedMealTab }));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent>
        <DialogTitle>
          <span className="sr-only">title</span>
        </DialogTitle>
        <div className="flex min-h-[50vh] w-full flex-col justify-between">
          <div className="max-h-[50vh] w-full overflow-y-auto p-4 pb-0">
            <SelectedEditMeal meals={meals} foods={foods} setFoods={setFoods} />
          </div>
          <DrawerFooter className="mx-auto w-md flex-row">
            <DrawerClose asChild>
              <Button color="gray" size="s">
                취소하기
              </Button>
            </DrawerClose>
            <Button onClick={handleSave} size="m">
              수정하기
            </Button>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
export default EditModal;
