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
        this.keyInterval = null;
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

    keyHandler = (data, event) => {
        console.log(data);
        console.log(event.keyCode);
        switch (event.keyCode) {
            case 38: { //up
                if (data) {
                    console.log('Interwal dispaczujacy');
                    this.props.wizardMoveUp();
                } else {
                    console.log('clear interwal');
                }
                break;
            }
            case 39: {
                //right

                break;
            }
            case 40: {
                //down
                break;
            }
        }
    };

    render() {
        console.log('pppp', this.props);
        const stageID = this.props.params.stageId;
        return (<div className="stage-container"
                     onKeyDown={ this.keyHandler.bind(this, true) }
                     onKeyUp={ this.keyHandler.bind(this, false) }
                    tabIndex="1">
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


const mapStateToProps = (state) => {
    return {
        wizard:state.game.wizard
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        stageLoad: () => dispatch(actions.loadData()),
        wizardMoveUp: () => dispatch(actions.wizardMoveUp())
    }
};

Stage = connect(mapStateToProps, mapDispatchToProps)(Stage);

export default Stage;