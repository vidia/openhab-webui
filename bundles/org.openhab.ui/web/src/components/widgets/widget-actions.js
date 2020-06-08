import OhPopup from './modals/oh-popup.vue'
import OhSheet from './modals/oh-sheet.vue'
import OhPopover from './modals/oh-popover.vue'

export const actionGroup = (label, description, groupPrefix) => {
  groupPrefix = (groupPrefix) ? groupPrefix += '_' : ''
  return {
    name: groupPrefix + 'actions',
    label: label || 'Action',
    description
  }
}

export const actionProps = (groupName, paramPrefix) => {
  paramPrefix = (paramPrefix) ? paramPrefix += '_' : ''
  if (!groupName) groupName = 'actions'
  return [
    {
      name: paramPrefix + 'action',
      label: 'Action',
      groupName,
      type: 'TEXT',
      context: 'widgetaction',
      description: 'Type of action to perform',
      limitToOptions: true,
      options: [
        {
          value: 'navigate',
          label: 'Navigate to page'
        },
        {
          value: 'command',
          label: 'Send command'
        },
        {
          value: 'toggle',
          label: 'Toggle item'
        },
        {
          value: 'popup',
          label: 'Open popup'
        },
        {
          value: 'popover',
          label: 'Open popover'
        },
        {
          value: 'sheet',
          label: 'Open sheet'
        },
        {
          value: 'analyzer',
          label: 'Analyze item(s)'
        },
        {
          value: 'url',
          label: 'External URL'
        }
      ]
    },
    {
      name: paramPrefix + 'actionUrl',
      label: 'Action URL',
      groupName,
      type: 'TEXT',
      context: 'url',
      description: 'URL to navigate to',
      visible: (value, configuration, configDescription, parameters) => {
        return ['url'].indexOf(configuration[paramPrefix + 'action']) >= 0
      }

    },
    {
      name: paramPrefix + 'actionItem',
      label: 'Action Item',
      groupName,
      type: 'TEXT',
      context: 'item',
      description: 'Item to perform the action on',
      visible: (value, configuration, configDescription, parameters) => {
        return ['command', 'toggle'].indexOf(configuration[paramPrefix + 'action']) >= 0
      }
    },
    {
      name: paramPrefix + 'actionCommand',
      label: 'Action Command',
      groupName,
      type: 'TEXT',
      description: 'Command to send to the item. If "toggle item" is selected as the action, only send the command when the state is different',
      visible: (value, configuration, configDescription, parameters) => {
        return ['command', 'toggle'].indexOf(configuration[paramPrefix + 'action']) >= 0
      }
    },
    {
      name: paramPrefix + 'actionCommandAlt',
      label: 'Action Toggle Command',
      groupName,
      type: 'TEXT',
      description: 'Command to send to the item when "toggle item" is selected as the action, and the item\'s state is equal to the command above',
      visible: (value, configuration, configDescription, parameters) => {
        return ['toggle'].indexOf(configuration[paramPrefix + 'action']) >= 0
      }
    },
    {
      name: paramPrefix + 'actionPage',
      label: 'Page',
      groupName,
      type: 'TEXT',
      context: 'page',
      description: 'Page to navigate to',
      visible: (value, configuration, configDescription, parameters) => {
        return ['navigate'].indexOf(configuration[paramPrefix + 'action']) >= 0
      }
    },
    {
      name: paramPrefix + 'actionPageTransition',
      label: 'Transition Effect',
      groupName,
      type: 'TEXT',
      limitToOptions: true,
      description: 'Use a specific <a class="external text-color-blue" target="_blank" href="https://framework7.io/docs/view.html#custom-page-transitions">page transition animation</a>',
      options: [
        { value: 'f7-circle', label: 'Circle' },
        { value: 'f7-cover', label: 'Cover' },
        { value: 'f7-cover-v', label: 'Cover from bottom' },
        { value: 'f7-dive', label: 'Dive' },
        { value: 'f7-fade', label: 'Fade' },
        { value: 'f7-flip', label: 'Flip' },
        { value: 'f7-parallax', label: 'Parallax' },
        { value: 'f7-push', label: 'Push' }
      ],
      visible: (value, configuration, configDescription, parameters) => {
        return ['navigate'].indexOf(configuration[paramPrefix + 'action']) >= 0
      }
    },
    {
      name: paramPrefix + 'actionModal',
      label: 'Modal Page or Widget',
      groupName,
      type: 'TEXT',
      context: 'pagewidget',
      description: 'Page or widget to display in the modal',
      visible: (value, configuration, configDescription, parameters) => {
        return ['popup', 'popover', 'sheet'].indexOf(configuration[paramPrefix + 'action']) >= 0
      }
    },
    {
      name: paramPrefix + 'actionModalConfig',
      label: 'Modal component configuration',
      groupName,
      context: 'props',
      type: 'TEXT',
      description: 'Configuration (prop values) for the target modal page or widget',
      visible: (value, configuration, configDescription, parameters) => {
        return ['navigate', 'popup', 'popover', 'sheet'].indexOf(configuration[paramPrefix + 'action']) >= 0
      }
    },
    {
      name: paramPrefix + 'actionAnalyzerItems',
      label: 'Item(s) to Analyze',
      groupName,
      context: 'item',
      type: 'TEXT',
      multiple: true,
      description: 'Start analyzing with the specified (set of) item(s)',
      visible: (value, configuration, configDescription, parameters) => {
        return ['analyzer'].indexOf(configuration[paramPrefix + 'action']) >= 0
      }
    },
    {
      name: paramPrefix + 'actionAnalyzerChartType',
      label: 'Chart Type',
      groupName,
      type: 'TEXT',
      limitToOptions: true,
      description: 'The initial analyzing period - dynamic or a predefined fixed period: day, week, month or year',
      visible: (value, configuration, configDescription, parameters) => {
        return ['analyzer'].indexOf(configuration[paramPrefix + 'action']) >= 0
      },
      options: [
        { value: '', label: 'Dynamic' },
        { value: 'day', label: 'Day' },
        { value: 'isoWeek', label: 'Week (starting on Mondays)' },
        { value: 'month', label: 'Month' },
        { value: 'year', label: 'Year' }
      ]
    },
    {
      name: paramPrefix + 'actionAnalyzerCoordSystem',
      label: 'Initial Coordinate System',
      groupName,
      type: 'TEXT',
      limitToOptions: true,
      description: 'The initial coordinate system of the analyzer - time, aggregate or calendar (only time is supported for dynamic periods)',
      visible: (value, configuration, configDescription, parameters) => {
        return ['analyzer'].indexOf(configuration[paramPrefix + 'action']) >= 0
      },
      options: [
        { value: 'time', label: 'Time' },
        { value: 'aggregate', label: 'Aggregate' },
        { value: 'calendar', label: 'Calendar' }
      ]
    }
  ]
}

export const actionsMixin = {
  components: {
    OhPopup,
    OhSheet,
    OhPopover
  },
  methods: {
    performAction (evt, prefix) {
      if (this.context.editmode) return
      prefix = (prefix) ? prefix += '_' : ''
      const action = this.config[prefix + 'action']
      if (!action) return
      switch (action) {
        case 'navigate':
          const actionPage = this.config[prefix + 'actionPage']
          const actionPageTransition = this.config[prefix + 'actionPageTransition']
          console.log('Navigating to ' + actionPage)
          if (actionPage.indexOf('page:') !== 0) {
            console.log('Action target is not of the format page:uid')
            return
          }
          let navigateOptions = { props: { deep: true } }
          if (actionPageTransition) navigateOptions.transition = actionPageTransition
          this.$f7router.navigate('/page/' + actionPage.substring(5), navigateOptions)
          break
        case 'command':
          const actionItem = this.config[prefix + 'actionItem']
          const actionCommand = this.config[prefix + 'actionCommand']
          this.$store.dispatch('sendCommand', { itemName: actionItem, cmd: actionCommand })
          break
        case 'toggle':
          const actionToggleItem = this.config[prefix + 'actionItem']
          const actionToggleCommand = this.config[prefix + 'actionCommand']
          const actionToggleCommandAlt = this.config[prefix + 'actionCommandAlt']
          const cmd = this.context.store[actionToggleItem].state === actionToggleCommand ? actionToggleCommandAlt : actionToggleCommand
          this.$store.dispatch('sendCommand', { itemName: actionToggleItem, cmd })
          break
        case 'options':
          const actionCommandOptionsItem = this.config[prefix + 'actionItem']
          const actionCommandOptions = this.config[prefix + 'actionOptions']
          const actions = actionCommandOptions.split(',').map((o) => {
            const parts = o.split('=')
            return {
              text: parts[1] || parts[0],
              color: 'blue',
              onClick: () => {
                this.$store.dispatch('sendCommand', { itemName: actionCommandOptionsItem, cmd: parts[0] })
              }
            }
          })
          this.$f7.actions.create({
            buttons: [
              actions,
              [{ text: 'Cancel', color: 'red' }]
            ]
          }).open()
          break
        case 'popup':
        case 'popover':
        case 'sheet':
          const actionModal = this.config[prefix + 'actionModal']
          const actionModalConfig = this.config[prefix + 'actionModalConfig']
          if (actionModal.indexOf('page:') !== 0 && actionModal.indexOf('widget:') !== 0 && actionModal.indexOf('oh-') !== 0) {
            console.log('Action target is not of the format page:uid or widget:uid')
            return
          }

          console.log(`Opening ${actionModal} in ${action} modal`)
          let modalRoute = {
            url: action + '/' + actionModal,
            route: {
            }
          }
          if (action === 'popup') modalRoute.route.popup = { component: OhPopup }
          if (action === 'popover') modalRoute.route.popup = { component: OhPopover }
          if (action === 'sheet') modalRoute.route.popup = { component: OhSheet }
          let modalProps = {
            props: {
              uid: actionModal,
              el: (evt && evt.target && evt.target._icon) ? evt.target._icon : (evt) ? evt.target : null,
              modalParams: actionModalConfig || {}
            }
          }
          this.$f7router.navigate(modalRoute, modalProps)
          break
        case 'analyze':
        case 'analyzer':
          const actionAnalyzerItems = this.config[prefix + 'actionAnalyzerItems']
          const actionAnalyzerChartType = this.config[prefix + 'actionAnalyzerChartType']
          const actionAnalyzerCoordSystem = this.config[prefix + 'actionAnalyzerCoordSystem']
          this.$f7router.navigate(`/analyzer/?items=${actionAnalyzerItems.join(',')}&chartType=${actionAnalyzerChartType || ''}&coordSystem=${actionAnalyzerCoordSystem || ''}`)
          console.log('Opening the analyzer')
          break
        case 'url':
          const actionUrl = this.config[prefix + 'actionUrl']
          console.log('opening URL: ' + actionUrl)
          break
        default:
          console.log('Invalid action: ' + action)
          break
      }
    }
  }
}
