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
import jexcelStyle from 'jexcel/dist/jexcel.css' // eslint-disable-line no-unused-vars
import jexcel from 'jexcel' // eslint-disable-line no-unused-vars
import axios from 'axios'

export default {
  name: 'jexcel',
  data() {
    return {
      bio: [
        {
          'id': 0,
          'nrp': null,
          'nama': null,
          'angkatan': null,
          'gender': null,
          'dob': null,
          'photo': null,
          'active': null
        }
      ],
      template: {
        'id': 0,
        'nrp': null,
        'nama': null,
        'angkatan': null,
        'gender': null,
        'dob': null,
        'photo': null,
        'active': null
      }
    }
  },
  computed: {
    jExcelOptions() {
      return {
        data: this.bio,
        columns: [
          { type: 'hidden', title: 'ID', width: '120px', name: 'id' },
          { type: 'numeric', title: 'NRP', width: '120px', name: 'nrp' },
          { type: 'text', title: 'Nama', width: '120px', name: 'nama' },
          { type: 'numeric', title: 'Angkatan', width: '120px', name: 'angkatan' },
          { type: 'text', title: 'Jenis Kelamin', width: '120px', name: 'gender' },
          { type: 'calendar', title: 'Tanggal lahir', width: '250px', name: 'dob' },
          { type: 'image', title: 'Photo', width: '120px', name: 'photo' },
          { type: 'checkbox', title: 'Aktif', width: '80px', name: 'active' }
        ],
        onchange: this.changed,
        oninsertrow: this.insertedRow,
        ondeleterow: this.deleteRow
      }
    }
  },
  methods: {
    load() {
      axios.get('http://localhost:8007/api/mahasiswa').then(response => {
        console.log(response)
        var valuesOnly = response.data.recordset
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

      var id = y + 1
      var data = {}
      axios.get('http://localhost:8007/api/mahasiswa/' + id).then((response) => {
        data = Object.values(response.data.recordset[0])
        // var keys = Object.keys(this.template)
        // console.log('key: ' + keys)
        // console.log(temp.constructor)
        // var key = keys[x+1]

        data[x] = value
        console.log(data)
        axios({
          method: 'put',
          url: 'http://localhost:8007/api/mahasiswa/' + id,
          data: {
            'id': data[0],
            'nrp': data[1],
            'nama': data[2],
            'angkatan': data[3],
            'gender': data[4],
            'dob': data[5],
            'photo': data[6],
            'active': data[7]
          }
        }).then((response) => {
          console.log(response.data)
        })
      })
    },
    insertedRow(instance) {
      axios({
        method: 'post',
        url: 'http://localhost:8007/api/mahasiswa/',
        data: {
          'nrp': null,
          'nama': null,
          'angkatan': null,
          'gender': null,
          'dob': null,
          'photo': null,
          'active': null
        }
      }).then((response) => {
        console.log(response.data)
      })
    },
    deleteRow(instance, id) {
      console.log(id)
      axios({
        method: 'delete',
        url: 'http://localhost:8007/api/mahasiswa/' + id,
        data: {
        }
      }).then((response) => {
        console.log(response.data)
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
