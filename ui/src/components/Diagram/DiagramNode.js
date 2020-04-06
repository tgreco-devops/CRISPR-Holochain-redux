var generateId = function () {
  return Math.trunc(Math.random() * 1000)
}

/**
 * @class DiagramNode
 */
class DiagramNode {
  /**
   *  This should not be called directly. Use the "addNode" method from the DiagramModel class
   * @param  {String} title  [description]
   * @param  {Integer} x      [description]
   * @param  {Integer} y      [description]
   * @param  {Integer} width  [description]
   * @param  {Integer} height [description]
   * @param  {Integer} id [description]
   * @param  {String} type [description]
   * @param  {String} color [description]
   * @param  {Integer} typeIndex  [description]
   */
  constructor (id, title, x, y, width, height, type, typeIndex, color) {
    this.title = title
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.type = type
    this.typeIndex = typeIndex
    this.color = color
    this.ports = []
  }

  /**
   * Adds a new "in" port into the node.
   * @param {String} name
   * @return {Integer} The port id
   */
  addInPort (name) {
    const newPort = {
      id: generateId(),
      type: 'in',
      name
    }

    this.ports.push(newPort)

    return newPort.id
  }

  /**
   * Adds a new "out" port into the node.
   * @param {String} name
   * @return {Integer} The port id
   */
  addOutPort (name) {
    const newPort = {
      id: generateId(),
      type: 'out',
      name
    }

    this.ports.push(newPort)

    return newPort.id
  }

  /**
   * Adds a new "out" port into the node.
   * @param {String} name
   * @return {Integer} The port id
   */
  addField (name) {
    const newPort = {
      id: generateId(),
      type: 'field',
      name
    }

    this.ports.push(newPort)

    return newPort.id
  }
}

export default DiagramNode