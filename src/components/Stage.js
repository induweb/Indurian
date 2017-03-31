import React from 'react';
import { connect } from 'react-redux';
import actions from '../actions/actionCreators';

import WindowHeader from './WindowHeader';
import Wizard from './Wizard';
import Ball from './Ball';
import CrateView from './CrateView';
import Spell from './Spell';
require('../styles/stage.scss');

class Stage extends React.Component {
    constructor(props) {
        super(props);
        console.log('props',props);

        props.stageLoad();
        this.interval = null;
    }

    componentDidMount() {
        // document.addEventListener('keydown', (event)=> {
        //     this.actions.handleKeyPressed(this.state, event);
        // });
        //
        // this.store.addListener((state) => {
        //     this.setState({
        //         wizardPosition: {
        //             top: state.wizardPosition.top
        //         },
        //         spellPosition: {
        //             left: state.spellPosition.left,
        //             top: state.spellPosition.top
        //         },
        //         wizardState: state.wizardState
        //     });
        // });


    }

    // resetSpell() {
    //     this.setState({
    //         spellPosition: {
    //             left: 60,
    //             top: -10
    //         },
    //         wizardState: 'idle'
    //     });
    //     this.interval = null;
    // }

    // handleKeyPressed(event){
        // console.log(event.keyCode);


    // }

    componentWillMount(){
        // console.log(this.state);
        // console.log(this.actions);
        // document.addEventListener('keydown', this.handleKeyPressed.bind(this), false);
        // onStageLoad();
    }

    componentWillUnmount() {
        // document.removeEventListener('keydown', this.handleEscKey, false);
    }

    render() {
        console.log('pppp', this.props);
        const stageID = this.props.params.stageId;
        return (<div className="stage-container">
                    <WindowHeader>Poziom #{stageID}</WindowHeader>
                    <div className="game-area">
                        <Wizard wizardPosition={this.props.wizard.positionTop} wizardState={this.props.wizard.state} />
                        {/*<Spell left={this.state.spellPosition.left} top={this.state.spellPosition.top}/>*/}
                        <Ball />
                        <CrateView id={stageID} />
                    </div>
                 </div>
        );
    }
}


const mapStateToProps = (state, ownProps = {}) => {
    return {
        wizard:state.wizard
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        stageLoad: () => dispatch(actions.loadData())
    }
};

Stage = connect(mapStateToProps, mapDispatchToProps)(Stage);

export default Stage;