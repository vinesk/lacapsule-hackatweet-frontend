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
            if (tweet.message==action.payload.message){
                if(action.payload.likes.includes(action.payload.user)){
                    tweet.likes=action.payload.likes.filter(user=>user.name!=action.payload.name)
                }else{
                    tweet.likes.push(action.payload.user);
                }
              break;
            }
        }
    },
    deleteTweetToStorage: (state, action) => {///changer message par id
      //if(state.value.user) verifier que l'user est l'auteur du tweet
        state.value=state.value.filter(tweet=> tweet.message!==action.payload.message)
    }
  },
});

export const { addTweetsToStorage ,updateLikeTweet,deleteTweetToStorage} = tweetsSlice.actions;
export default tweetsSlice.reducer;