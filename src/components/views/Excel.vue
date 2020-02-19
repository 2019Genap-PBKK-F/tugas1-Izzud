<template lang='html'>
  <div class='wrapper-jexcel'>
    <br>
    <input
      type='button'
      value='Add new row'
      @click='jExcelObj.insertRow()'
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
          'nrp': 0,
          'name': 'aaaaaaaaaaaaaaa',
          'angkatan': 2342,
          'dob': '',
          'img': '',
          'aktif': true
        }
      ],
      template: {
        'id': 0,
        'nrp': 0,
        'name': 'aaaaaaaaaaaaaaa',
        'angkatan': 2342,
        'dob': '',
        'img': '',
        'aktif': true
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
          { type: 'text', title: 'Nama', width: '120px', name: 'name' },
          { type: 'numeric', title: 'Angkatan', width: '120px', name: 'angkatan' },
          { type: 'calendar', title: 'Tanggal lahir', width: '250px', name: 'dob' },
          { type: 'image', title: 'Photo', width: '120px', name: 'img' },
          { type: 'checkbox', title: 'Aktif', width: '80px', name: 'aktif' }
        ],
        onchange: this.changed,
        oninsertrow: this.insertedRow
      }
    }
  },
  methods: {
    load() {
      axios.get('http://localhost:3000/mahasiswa').then(response => {
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

      var id = y
      var temp = {}
      axios.get('http://localhost:3000/mahasiswa/' + id).then((response) => {
        temp = response.data
        var keys = Object.keys(this.template)
        // var key = keys[x+1]

        temp[keys[x]] = value
        console.log(temp)
        axios({
          method: 'put',
          url: 'http://localhost:3000/mahasiswa/' + id,
          data: temp
        }).then((response) => {
          console.log(response.data)
        })
      })
    },
    insertedRow(instance) {
      axios({
        method: 'post',
        url: 'http://localhost:3000/mahasiswa/',
        data: {
          'nrp': 0,
          'name': '',
          'angkatan': 0,
          'dob': '',
          'img': '',
          'aktif': true
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
