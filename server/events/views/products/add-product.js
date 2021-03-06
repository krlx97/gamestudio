const addProduct = async (manager, data) => {
  const {io, socket, db} = manager
  const {token, dbCollection, product} = data

  try {
    if (await manager.verifyAdmin(token)) {
      const inserted = await db.collection(dbCollection).insertOne(product)

      io.emit('addProductRes', inserted.ops[0])
      socket.emit('matDialogClose')
    }
  } catch (err) {
    console.error(err)
  }
}

module.exports = addProduct