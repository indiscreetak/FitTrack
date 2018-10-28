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
import { Spring, config } from 'react-spring';

const Box = styled(Container)`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const ExerciseBox = styled(Box)`
  height: 10em;
`;

const FriendsBox = styled(Box)`
  height: 8em;
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
      <Spring from={{ opacity: 0 }} to={{ opacity: 1 }} config={config.slow}>
        {opacity => (
          <Tile isAncestor style={{ margin: '1em' }}>
            <Tile>
              <Tile isParent isVertical>
                <Tile isChild>
                  <Box style={opacity}>
                    <Title isSize="5">STEPS</Title>
                    <ProgressBar
                      type={steps ? steps + ' Steps' : 'No Steps Data'}
                      name="steps"
                    />
                  </Box>
                </Tile>
                <Tile isChild>
                  <Box style={opacity}>
                    <Title isSize="5">CALORIES</Title>
                    <ProgressBar
                      type={
                        calories
                          ? calories + ' calories burned'
                          : 'No Calorie Data'
                      }
                      name="calories"
                      target="6000"
                    />
                  </Box>
                </Tile>
              </Tile>
              <Tile isParent isVertical>
                <Tile isChild>
                  <Box style={opacity}>
                    <Title isSize="5">CURRENT WEIGHT</Title>
                    <ProgressBar
                      type={
                        weight ? 75 - weight + ' KG to go' : 'No Weight Data'
                      }
                      name="weight"
                    />
                  </Box>
                </Tile>
                <Tile isChild>
                  <Box style={opacity}>
                    <Title isSize="5">Friends</Title>
                    {friends
                      ? friends.map((friend, key) => (
                          <FriendsBox>
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
                          </FriendsBox>
                        ))
                      : 'no friends'}
                  </Box>
                </Tile>
              </Tile>
            </Tile>
            <Tile isParent isSize={4}>
              <Tile isChild>
                <Box style={opacity}>
                  {recentExercises ? (
                    recentExercises.map((exercise, key) => (
                      <ExerciseBox key={key + Math.random()}>
                        <ul key={key + Math.random()}>
                          <li key={key + Math.random()}>
                            <strong>Type:</strong> {exercise.activity}
                          </li>
                          <li key={key + Math.random()}>
                            <strong>Date:</strong> {exercise.date}
                          </li>
                          <li key={key}>
                            <strong>Distance:</strong>
                            {exercise.distance}
                          </li>
                          <li key={key + Math.random()}>
                            <strong>Calories Burnt: </strong>
                            {exercise.calburn ? exercise.calburn : 'No Data'}
                          </li>
                        </ul>
                      </ExerciseBox>
                    ))
                  ) : (
                    <span>No Data</span>
                  )}
                </Box>
              </Tile>
            </Tile>
          </Tile>
        )}
      </Spring>
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
