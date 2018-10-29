import React, { Component } from 'react';
import {
  Tile,
  Box as Container,
  Title,
  Media,
  MediaLeft,
  MediaContent,
  Content,
  Columns,
  Button,
  Select,
  Field,
  Control
} from 'bloomer';
import { connect } from 'react-redux';
import { getData } from '../store/actions/dataActions';
import ProgressBar from './progressBar';
import styled from 'styled-components';
import { Spring, config } from 'react-spring';
import moment from 'moment';

const Box = styled(Container)`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  &:hover {
    transform: translateY(-5px);
  }
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
          <Columns style={{ margin: '1em' }}>
            <Tile isAncestor style={{ margin: '1em' }}>
              <Tile>
                <Tile isParent isVertical>
                  <Tile isChild>
                    <Box style={opacity}>
                      <Title isSize="5">Steps</Title>
                      <ProgressBar
                        type={steps ? steps + ' Steps' : 'No Steps Data'}
                        name="steps"
                      />
                    </Box>
                  </Tile>
                  <Tile isChild>
                    <Box style={opacity}>
                      <Title isSize="5">Calories</Title>
                      <ProgressBar
                        type={
                          calories
                            ? calories + ' calories burnt today'
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
                      <Title isSize="5">Current Weight</Title>
                      <ProgressBar
                        type={
                          weight
                            ? weight - 75 + ' KG to target'
                            : 'No Weight Data'
                        }
                        name="weight"
                      />
                    </Box>
                  </Tile>
                  <Tile isChild>
                    <Box style={opacity}>
                      <Title isSize="7">Friends</Title>
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
                                    <p>
                                      <strong key={key}>{friend}</strong>
                                      <br />
                                      <Button isColor="success">
                                        SEND MESSAGE
                                      </Button>
                                    </p>
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

              <Tile isParent isSize={5}>
                <Tile isChild>
                  <Box style={opacity}>
                    <Title isSize="5">Recent Exercises</Title>
                    {recentExercises ? (
                      recentExercises.map((exercise, key) => {
                        const date = exercise.date;
                        const momentDate = moment(date).format(
                          'dddd Do MMMM YYYY'
                        );
                        return (
                          <ExerciseBox key={key + Math.random()}>
                            <ul key={key + Math.random()}>
                              <li key={key + Math.random()}>
                                <strong>Type:</strong> {exercise.activity}
                              </li>
                              <li key={key + Math.random()}>
                                <strong>Date:</strong> {momentDate}
                              </li>
                              <li key={key}>
                                <strong>Distance: </strong>
                                {exercise.distance + ' km'}
                              </li>
                              <li key={key + Math.random()}>
                                <strong>Calories Burnt: </strong>
                                {exercise.calburn
                                  ? exercise.calburn
                                  : 'No Data'}
                              </li>
                            </ul>
                          </ExerciseBox>
                        );
                      })
                    ) : (
                      <span>No Data</span>
                    )}
                  </Box>
                </Tile>
              </Tile>
            </Tile>
          </Columns>
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
