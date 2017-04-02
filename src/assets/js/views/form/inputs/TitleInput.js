'use strict'

import React from 'react';
import {Row, Col, Button, FormControl, ControlLabel, FormGroup} from 'react-bootstrap/lib';
const ENTER_KEY_CODE = 13;

function TitleDraftInputComponent(props) {
  var input = {};

  const onChange = (event) => props.onUpdateTitleDraft(input.value);
  const onAddTitle = () => props.onAddTitle(input.value);
  const onCloseTitleDraft = () => props.onCloseTitleDraft();
  const onKeyDown = (event) => {
  if (event.keyCode === ENTER_KEY_CODE) {
    onAddTitle();
  }
  };

  return (
    <div>
      <Col md={12} className='vertical-align-middle'>
        <Col md={4}>
          <FormGroup controlId="titleInput"
          validationState={props.draft.validationError}>
            <ControlLabel>Title</ControlLabel>
            <FormControl
              inputRef={(ref) => {input = ref}}
              onKeyDown={onKeyDown}
              onChange={onChange}
              value={props.draft.text}
              type='text'></FormControl>
          </FormGroup>
        </Col>
        <Col md={2}>
          <Button onClick={onAddTitle}>Save</Button>
        </Col>
        <Col md={2}>
          <Button onClick={onCloseTitleDraft}>Cancel</Button>
        </Col>
      </Col>
    </div>
  )
}

function TitleInputComponent(props) {
  const {title, titleEdited} = props;
  var input = {};

  const onSaveTitle = () => props.onSaveTitle();
  const onChange = (event) => props.onEditTitle(input.value);
  const onStartEditTitle = () => props.onStartEditTitle();
  const onDeleteTitle = () => props.onDeleteTitle();
  const onKeyDown = (event) => {
    if (event.keyCode === ENTER_KEY_CODE) {
      onSaveTitle();
    }
  };

  const isEdited = (titleEdited !== false);
  var validationError = null;
  if (isEdited && titleEdited.validationError) validationError = titleEdited.validationError;
  return (
    <div>
      <Col md={12} className='vertical-align-middle'>
        <Col md={4}>
          <FormGroup controlId="titleInput"
          validationState={validationError}>
            <FormControl
              onDoubleClick={onStartEditTitle}
              onKeyDown={onKeyDown}
              readOnly={!isEdited}
              inputRef={(ref) => {input = ref}}
              onChange={onChange} value={title}
              type='text'></FormControl>
          </FormGroup>
        </Col>
        {(isEdited &&
          <Col md={2}>
            <Button onClick={onSaveTitle}>Save</Button>
          </Col>
        )}
        <Col md={2}>
          <Button onClick={onDeleteTitle}>Cancel</Button>
        </Col>
      </Col>
    </div>

  )
}

function TitleInput(props) {
  var {title, titleEdited} = props;
  const onOpenTitleDraft = () => props.onOpenTitleDraft();
  var draftOn = ((props.titleDraft) ? true : false);
  if(title) draftOn = false;
  var input = <TitleDraftInputComponent
              draft={props.titleDraft}
              onCloseTitleDraft={props.onCloseTitleDraft}
              onUpdateTitleDraft={props.onUpdateTitleDraft}
              onAddTitle={props.onAddTitle}
              titleType={props.type}
            />;
  var inputEdit = <TitleInputComponent
                  title={title}
                  {...props}
        />;

  return (
    <div>
      <Col md={12}><h3>Map title</h3></Col>
      <Col md={12}>
        <Button disabled={!!title || draftOn} onClick={onOpenTitleDraft}>Add title</Button>
        {(!title && draftOn) ? input : null}
        {(!!title || titleEdited) ? inputEdit : null}
      </Col>
  </div>
  )
}

export default TitleInput;
