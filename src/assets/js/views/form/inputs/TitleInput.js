'use strict'

import React from 'react';
import {Row, Col, FormControl, ControlLabel, FormGroup, OverlayTrigger, Glyphicon, Popover} from 'react-bootstrap/lib';
import {AddButton, DeleteButton, EditButton, SaveButton, CancelButton} from './components'
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
        <Col md={6}>
          <FormGroup controlId="titleInput"
          validationState={props.draft.validationError}>
            <ControlLabel>Title</ControlLabel>
            <FormControl
              inputRef={(ref) => {input = ref}}
              onKeyDown={onKeyDown}
              onChange={onChange}
              placeholder='required'
              value={props.draft.text}
              type='text'></FormControl>
          </FormGroup>
        </Col>
        <Col md={2}>
          <SaveButton onClick={onAddTitle} />
        </Col>
        <Col md={2}>
          <CancelButton onClick={onCloseTitleDraft} />
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
        <Col lg={6} md={6} sm={6} xs={6}>
          <FormGroup controlId="titleInput"
          validationState={validationError}>
            <FormControl
              onDoubleClick={onStartEditTitle}
              onKeyDown={onKeyDown}
              readOnly={!isEdited}
              placeholder='required'
              inputRef={(ref) => {input = ref}}
              onChange={onChange} value={title}
              type='text'></FormControl>
          </FormGroup>
        </Col>
        <Col lg={6} md={12} sm={6} xs={6}>
          {(isEdited &&
            <Col lg={6} md={12} sm={6} xs={12}>
              <SaveButton onClick={onSaveTitle} />
            </Col>
          )}
          {(!isEdited) &&
            <Col lg={4} md={12} sm={6} xs={12}>
              <EditButton class='btn-block-md' onClick={onStartEditTitle} />
            </Col>
          }
          <Col lg={4} md={12} sm={6} xs={12}>
            <DeleteButton onClick={onDeleteTitle} />
          </Col>
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

  var popover = (
    <Popover
    id="points-help-popover"
    placement="right"
    positionLeft={200}
    positionTop={50}
    title="Help: adding a title"
  >
    <p>If set, the title will be displayed at the center top of the map.</p>
  </Popover>
  )

  return (
    <div>
      <Col md={12} className='vertical-align-middle'>
          <h3 className='pull-left'>Map title {'\u00a0'}</h3>
          <OverlayTrigger placement="right" overlay={popover}>
            <Glyphicon glyph='question-sign'/>
          </OverlayTrigger>
      </Col>
      <Col lg={12} md={12} sm={12} xs={12}>
        <Col lg={6} md={8} sm={12} xs={12}>
          <AddButton class='btn-block' disabled={(!!title || draftOn)} onClick={onOpenTitleDraft} text='title' />
        </Col>
        {(!title && draftOn) ? input : null}
        {(!!title || titleEdited) ? inputEdit : null}
      </Col>
  </div>
  )
}

export default TitleInput;
