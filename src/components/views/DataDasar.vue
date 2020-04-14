<template lang='html'>
  <div class='wrapper-jexcel'>
    <br>
    <input
      type='button'
      value='Add new row'
      @click='jExcelObj.insertRow()'
    />
    <input
      type='button'
      value='Delete row'
      @click='jExcelObj.deleteRow()'
    />
    <br />
    <br />
    <div id='spreadsheet' ref='spreadsheet'></div>
  </div>
</template>

<script>
import 'jexcel/dist/jexcel.css' // eslint-disable-line no-unused-vars
import jexcel from 'jexcel' // eslint-disable-line no-unused-vars
import axios from 'axios'

var host = 'http://10.199.14.46:8007'

export default {
  name: 'jexcel',
  data() {
    return {
      bio: [
        {
          'id': 0,
          'nama': null
        }
      ],
      template: {
        'id': 0,
        'nama': null
      }
    }
  },
  computed: {
    jExcelOptions() {
      return {
        data: this.bio,
        columns: [
          { type: 'hidden', title: 'ID', width: '120px', name: 'id' },
          { type: 'text', title: 'Nama', width: '120px', name: 'name' }
        ],
        onchange: this.changed,
        oninsertrow: this.insertedRow,
        ondeleterow: this.deleteRow,
        responsive: true
      }
    }
  },
  methods: {
    load() {
      console.log('load')
      console.log(host + '/api/dasar')
      axios.get(host + '/api/dasar').then(response => {
        console.log(response)
        var valuesOnly = response.data
        this.bio = valuesOnly
        console.log(this.bio)
      }).catch((err) => {
        console.log(err)
      })
    },
    changed(instance, cell, x, y, value) {
      x = parseInt(x)
      y = parseInt(y)

      console.log('x: ' + x + '\ny: ' + y)

      var id = y
      var data = {}
      axios.get(host + '/api/dasar').then((response) => {
        data = Object.values(response.data[id])

        data[x] = value
        console.log(data)
        axios({
          method: 'put',
          url: host + '/api/dasar/' + data[0],
          data: {
            'id': data[0],
            'nama': data[1]
          }
        }).then((response) => {
          console.log(response.data)
        })
      })
    },
    insertedRow(instance) {
      axios({
        method: 'post',
        url: host + '/api/dasar/',
        data: {
          'nama': null
        }
      }).then((response) => {
        console.log(response.data)
      })
    },
    deleteRow(instance, row) {
      console.log(row)
      axios.get(host + '/api/dasar/').then(res => {
        console.log(res.data[row])
        var index = Object.values(res.data[row])
        // console.log(index)
        axios.delete(host + '/api/dasar/' + index[0])
      })
    }
  },
  mounted() {
    this.load()
  },
  watch: {
    bio () {
      const jExcelObj = jexcel(this.$refs['spreadsheet'], this.jExcelOptions)
      Object.assign(this, { jExcelObj })
    }
  }
}
</script>

<style lang='css' scoped>
.introduction {
  font-size: 14px;
  padding: 0.5em;
  margin-bottom: 0.3em;
  color: gold;
  background: #111;
}
</style>
