import ACTIONS from '../constants/actions'
import stagesData from 'json-loader!../sources/data.json';

const makeActionCreators = function(dispatch){
    return {
        loadData: function(){
            dispatch({
                type: ACTIONS.LOAD_DATA,
                payload: stagesData.stages,
                meta:{
                    timestamp: Date.now()
                }
            })
        }
    };
};

export default makeActionCreators;