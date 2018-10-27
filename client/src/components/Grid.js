import React, { Component } from 'react';
import {
  Tile,
  Box as Container,
  Title,
  Media,
  MediaLeft,
  MediaContent,
  Content,
  Image
} from 'bloomer';
import { connect } from 'react-redux';
import { getData } from '../store/actions/dataActions';
import ProgressBar from './progressBar';
import styled from 'styled-components';

const Box = styled(Container)`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

class Grid extends Component {
  componentDidMount() {
    this.props.onGetData();
  }
  render() {
    const {
      steps,
      weight,
      calories,
      friends,
      recentExercises
    } = this.props.data;

    return (
      <Tile isAncestor style={{ margin: '2em' }}>
        <Tile>
          <Tile isParent isVertical>
            <Tile isChild>
              <Box>
                <Title isSize="5">STEPS</Title>
                <ProgressBar
                  type={steps ? steps + ' Steps' : 'No Steps Data'}
                  name="steps"
                />
              </Box>
            </Tile>
            <Tile isChild>
              <Box>
                <Title isSize="5">CALORIES</Title>
                <ProgressBar
                  type={
                    calories ? calories + ' calories burned' : 'No Calorie Data'
                  }
                  name="calories"
                  target="6000"
                />
              </Box>
            </Tile>
          </Tile>
          <Tile isParent isVertical>
            <Tile isChild>
              <Box>
                <Title isSize="5">CURRENT WEIGHT</Title>
                <ProgressBar
                  type={weight ? weight + ' KG' : 'No Weight Data'}
                  name="weight"
                />
              </Box>
            </Tile>
            <Tile isChild>
              <Box>
                <Title isSize="5">Friends</Title>
                {friends
                  ? friends.map((friend, key) => (
                      <Box>
                        <Media>
                          <MediaLeft>
                            <img
                              alt="Prop"
                              style={{
                                height: '64px',
                                width: '64px',
                                borderRadius: '50%'
                              }}
                              src={
                                `http://i.pravatar.cc/150?img= ` +
                                Math.random() * 20
                              }
                            />
                          </MediaLeft>
                          <MediaContent>
                            <Content>
                              <span key={key}>{friend}</span>
                            </Content>
                          </MediaContent>
                        </Media>
                      </Box>
                    ))
                  : 'no friends'}
              </Box>
            </Tile>
          </Tile>
        </Tile>
        <Tile isParent>
          <Tile isChild>
            <Box>
              {recentExercises ? (
                recentExercises.map((exercise, key) => (
                  <Box key={key + Math.random()}>
                    <ul key={key + Math.random()}>
                      <li key={key + Math.random()}>
                        Type: {exercise.activity}
                      </li>
                      <li key={key + Math.random()}>Date: {exercise.date}</li>
                      <li key={key}>Distance: {exercise.distance}</li>
                      <li key={key + Math.random()}>
                        Calories Burnt:
                        {exercise.calburn ? exercise.calburn : 'No Data'}
                      </li>
                    </ul>
                  </Box>
                ))
              ) : (
                <span>No Data</span>
              )}
            </Box>
          </Tile>
        </Tile>
      </Tile>
    );
  }
}

const mapStateToProps = state => ({
  data: state.data
});

const mapDispatchToProps = dispatch => ({
  onGetData: () => dispatch(getData())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Grid);
