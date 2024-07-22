import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const tweetsSlice = createSlice({
  name: "tweets",
  initialState,
  reducers: {
    addTweetsToStorage: (state, action) => {
      state.value.push(action.payload);
    },
    updateTweetsToStorage: (state, action) => {
      state.value=action.payload;
    },
    updateLikeTweet:(state, action)=>{
        for(let tweet of state.value){
            if (tweet.id==action.payload.tweet.id){
              tweet.likes=action.payload.tweet.likes;
                // if(tweet.likes.includes(action.payload.username)){
                //     tweet.likes=tweet.likes.filter((user)=>user!==action.payload.username)
                // }else{
                //     tweet.likes.push(action.payload.username);
                // }
              break;
            }
        }
    },
    deleteTweetToStorage: (state, action) => {
      if(action.payload.username==state.value.username){
        state.value=state.value.filter(tweet=> tweet.id!==action.payload.id)
      }
    }
  },
});

export const { addTweetsToStorage,updateTweetsToStorage, updateLikeTweet, deleteTweetToStorage } =
  tweetsSlice.actions;
export default tweetsSlice.reducer;
