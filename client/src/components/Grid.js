import React from 'react';
import { Tile, Box } from 'bloomer';
import { connect } from 'react-redux';

const grid = props => {
  const { steps, weight, calories, friends, recentExercises } = props.data;

  const walk = <div>walk more</div>;
  return (
    <Tile isAncestor style={{ margin: '2em' }}>
      <Tile isVertical isParent>
        <Tile isChild>
          <Box>{steps <= 0 ? walk : steps} steps</Box>
        </Tile>
        <Tile isChild>
          <Box>{calories} Calories</Box>
        </Tile>
      </Tile>
      <Tile isVertical isParent>
        <Tile isChild>
          <Box>{weight} kg</Box>
        </Tile>
        <Tile isChild>
          <Box>
            Friends :
            {friends.map((friend, key) => (
              <ul key={key}>
                <li key={key}>{friend}</li>
              </ul>
            ))}
          </Box>
        </Tile>
      </Tile>
      <Tile isParent>
        <Tile isChild>
          <Box>
            {recentExercises.map((exercise, key) => (
              <Box key={key + Math.random()}>
                <ul key={key + Math.random()}>
                  <li key={key + Math.random()}>Type: {exercise.type}</li>
                  <li key={key + Math.random()}>Date: {exercise.date}</li>
                  <li key={key}>Distance: {exercise.distance}</li>
                  <li key={key + Math.random()}>
                    Calories Burnt: {exercise.calBurn}
                  </li>
                </ul>
              </Box>
            ))}
          </Box>
        </Tile>
      </Tile>
    </Tile>
  );
};

const mapStateToProps = state => ({
  data: state.data
});

export default connect(mapStateToProps)(grid);
