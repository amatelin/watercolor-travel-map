'use strict'

import React from 'react';
import {Row, Col, Button, FormControl, ControlLabel, FormGroup} from 'react-bootstrap/lib';
const ENTER_KEY_CODE = 13;

function GeodesicDraftInput(props) {
  var inputs = {"latitude": null,
                "longitude": null};

  const onChange = (event) => props.onUpdateGeodesicDraft({latitude: inputs.latitude.value,
                                                            longitude: inputs.longitude.value});
  const onAddGeodesic = () => props.onAddGeodesic(props.geodesicType, {latitude: inputs.latitude.value,
                                                            longitude: inputs.longitude.value});
  const onCloseGeodesicDraft = () => props.onCloseGeodesicDraft();
  const onKeyDown = (event) => {
  if (event.keyCode === ENTER_KEY_CODE) {
    onAddGeodesic();
  }
  };

  return (
    <div>
      <Col md={12} className='vertical-align-middle'>
        <Col md={4}>
          <FormGroup controlId="latitudeInput"
          validationState={props.draft.validationErrors[0]}>
            <ControlLabel>Latitude</ControlLabel>
            <FormControl
              inputRef={(ref) => {inputs.latitude = ref}}
              onKeyDown={onKeyDown}
              onChange={onChange}
              value={props.draft.latitude}
              type='text'></FormControl>
          </FormGroup>
        </Col>
        <Col md={4}>
          <FormGroup controlId="longitudeInput"
          validationState={props.draft.validationErrors[1]}>
            <ControlLabel>Longitude</ControlLabel>
            <FormControl
              inputRef={(ref) => {inputs.longitude = ref}}
              onKeyDown={onKeyDown}
              onChange={onChange}
              value={props.draft.longitude}
              type='text'></FormControl>
          </FormGroup>
        </Col>
        <Col md={2}>
          <Button onClick={onAddGeodesic}>Save</Button>
        </Col>
        <Col md={2}>
          <Button onClick={onCloseGeodesicDraft}>Cancel</Button>
        </Col>
      </Col>
    </div>
  )
}

function GeodesicInput(props) {
  const {geodesic, geodesicEdited} = props;
  var inputs = {"latitude": null,
                "longitude": null};

  const onSaveGeodesic = () => props.onSaveGeodesic(geodesic.id);
  const onChange = (event) => props.onEditGeodesic(geodesic.id, {latitude: inputs.latitude.value,
    longitude: inputs.longitude.value});
  const onStartEditGeodesic = () => props.onStartEditGeodesic(geodesic.id);
  const onDeleteGeodesic = () => props.onDeleteGeodesic(geodesic.id);
  const onKeyDown = (event) => {
  if (event.keyCode === ENTER_KEY_CODE) {
    onSaveGeodesic();
  }
  };

  const isEdited = (geodesic.id === geodesicEdited.id);
  var validationErrors = [null,null];
  if (isEdited && geodesicEdited.validationErrors) validationErrors = geodesicEdited.validationErrors;
  return (
    <div>
      <Col md={12} className='vertical-align-middle'>
        <Col md={4}>
          <FormGroup controlId="latitudeInput"
          validationState={validationErrors[0]}>
            {(props.geodesicIndex === 1) &&
            <ControlLabel>Latitude</ControlLabel>
            }
            <FormControl
              onDoubleClick={onStartEditGeodesic}
              onKeyDown={onKeyDown}
              readOnly={!isEdited}
              inputRef={(ref) => {inputs.latitude = ref}}
              onChange={onChange} value={props.geodesic.coordinates.latitude}
              type='text'></FormControl>
          </FormGroup>
        </Col>
        <Col md={4}>
          <FormGroup controlId="longitudeInput"
          validationState={validationErrors[1]}>
            {(props.geodesicIndex === 1)  &&
              <ControlLabel>Longitude</ControlLabel>
            }
            <FormControl
              onDoubleClick={onStartEditGeodesic}
              onKeyDown={onKeyDown}
              readOnly={!isEdited}
              inputRef={(ref) => {inputs.longitude = ref}}
              onChange={onChange} value={props.geodesic.coordinates.longitude}
              type='text'></FormControl>
          </FormGroup>
        </Col>
        {(isEdited &&
          <Col md={2}>
            <Button onClick={onSaveGeodesic}>Save</Button>
          </Col>
        )}
        <Col md={2}>
          <Button onClick={onDeleteGeodesic}>Delete</Button>
        </Col>
      </Col>
    </div>

  )
}

function GeodesicInputsComponent(props) {
  var _local_counter = 1;
  var geodesics = props.geodesics.filter(geodesic => geodesic.type == props.type);
  const onOpenGeodesicDraft = () => props.onOpenGeodesicDraft(props.type);
  const draftOn = ((props.geodesicDraft && props.geodesicDraft.geodesicType === props.type) ? true : false);
  var input = <GeodesicDraftInput
              draft={props.geodesicDraft}
              onCloseGeodesicDraft={props.onCloseGeodesicDraft}
              onUpdateGeodesicDraft={props.onUpdateGeodesicDraft}
              onAddGeodesic={props.onAddGeodesic}
              geodesicType={props.type}
            />

  return (
    <Col md={12}>
      <Button disabled={draftOn} onClick={onOpenGeodesicDraft}>Add {props.type}</Button>
      {draftOn ? input : null }

      {geodesics.map(geodesic => (
            <GeodesicInput
            key={geodesic.id}
            geodesicIndex={_local_counter++}
            geodesic={geodesic}
            {...props}

          />
        ))}

    </Col>
  )
}

function GeodesicInputs(props) {
  return (
    <div>
      <Col md={12}><h3>Geodesics</h3></Col>
        <GeodesicInputsComponent type='flight' {...props}/>
        <GeodesicInputsComponent type='ferry' {...props}/>
    </div>
  )
}

export default GeodesicInputs;
