import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: [],
};

export const tweetsSlice = createSlice({
  name: 'tweets',
  initialState,
  reducers: {
    addTweetsToStorage: (state, action) => {
      state.value.push(action.payload)
    },
    updateLikeTweet:(state, action)=>{///changer message par id
        for(let tweet of state.value){
            if (tweet.user==action.payload.user){
                if(action.payload.likes.includes(action.payload.user)){
                    tweet.likes=action.payload?.likes.filter((user)=>user?.id!=action.payload.id)
                }else{
                    tweet.likes.push(action.payload.user);
                }
              break;
            }
        }
    },
    deleteTweetToStorage: (state, action) => {///changer message par id
      if(action.payload.username==state.value.username){
        state.value=state.value.filter(tweet=> tweet.id!==action.payload.id)
      }
    }
  },
});

export const { addTweetsToStorage ,updateLikeTweet,deleteTweetToStorage} = tweetsSlice.actions;
export default tweetsSlice.reducer;