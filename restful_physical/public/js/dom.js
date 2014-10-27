var finding = document.getElementById('finding');
var setting = document.getElementById('setting');
finding.style.display = 'none';
setting.style.display = 'none';

function showFinding() {
  document.getElementById('option').style.display = 'none';
  finding.style.display = 'block';
}

function showSetting() {
  document.getElementById('option').style.display = 'none';
  setting.style.display = 'block';
}