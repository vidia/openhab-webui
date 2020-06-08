/* Determine the appropriate default representation of an item when displayed in a list.
   Users may override it by specifying the component's name and configuration
   in the "listWidget" metadata namespace of the item
 */

export default function itemDefaultListComponent (item) {
  const stateDescription = item.stateDescription || {}
  let component = null

  if (item.metadata && item.metadata.listWidget) {
    component = {
      component: item.metadata.listWidget.value,
      config: item.metadata.listWidget.config
    }
  } else {
    if (item.type === 'Switch' && !stateDescription.readOnly) {
      component = {
        component: 'oh-toggle-listitem'
      }
    }

    if (item.type === 'Dimmer' && !stateDescription.readOnly) {
      component = {
        component: 'oh-slider-listitem',
        config: {
          scale: true,
          label: true,
          scaleSubSteps: 5,
          min: stateDescription.minimum,
          max: stateDescription.maximum,
          step: stateDescription.step
        }
      }
    }

    // if (item.type === 'Color' && !stateDescription.readOnly) {
    //   component = {
    //     component: 'oh-colorpicker-listitem',
    //     config: {
    //       sliderLabel: true,
    //       sliderValue: true
    //     }
    //   }
    // }

    if (item.type === 'Rollershutter' && !stateDescription.readOnly) {
      component = {
        component: 'oh-rollershutter-listitem'
      }
    }

    if (item.type === 'Player' && !stateDescription.readOnly) {
      component = {
        component: 'oh-player-listitem'
      }
    }
  }

  if (!component) {
    component = {
      component: 'oh-label-listitem'
    }

    if (item.type.indexOf('Number:') === 0) {
      component.config = {
        action: 'analyze',
        actionAnalyzerItems: [item.name]
      }
    } else if (item.commandDescription && item.commandDescription.commandOptions && !stateDescription.readOnly) {
      component.config = {
        action: 'options',
        actionItem: item.name,
        actionOptions: item.commandDescription.commandOptions.map((o) => (o.label) ? o.command + '=' + o.label : o.command).join(',')
      }
    }
  }

  if (!component.config) component.config = {}
  component.config.item = item.name
  component.config.title = item.label || item.name

  return component
}
