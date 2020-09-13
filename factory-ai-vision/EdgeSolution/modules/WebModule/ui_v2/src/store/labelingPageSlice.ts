import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { deleteImage, changeImage } from './actions';

export type LabelPageState = {
  imageIds: number[];
  selectedImageId: number;
};

const changeSelectedImage = (offset: 1 | -1) => (state: LabelPageState) => {
  const selectedImageIdx = state.imageIds.findIndex((e) => e === state.selectedImageId);
  return {
    ...state,
    selectedImageId: state.imageIds[selectedImageIdx + offset],
  };
};

const slice = createSlice({
  name: 'labelingPage',
  initialState: { imageIds: [], selectedImageId: null },
  reducers: {
    openLabelingPage: (_, action: PayloadAction<{ imageIds: number[]; selectedImageId: number }>) => ({
      imageIds: action.payload.imageIds,
      selectedImageId: action.payload.selectedImageId,
    }),
    closeLabelingPage: () => ({
      imageIds: [],
      selectedImageId: null,
    }),
  },
  extraReducers: (builder) =>
    builder
      .addCase(deleteImage.fulfilled, (state, action) => {
        const removeIdx = state.imageIds.findIndex((id) => id === action.payload);
        state.imageIds.splice(removeIdx, 1);
        if (state.imageIds.length === 0) state.selectedImageId = null;
        else state.selectedImageId = state.imageIds[removeIdx] || state.imageIds[0];
      })
      .addCase(changeImage, (state, action) => changeSelectedImage(action.payload.offset)(state)),
});

const { reducer } = slice;
export default reducer;

export const { openLabelingPage, closeLabelingPage } = slice.actions;