# #!/bin/bash

# set -e

# echo "🚀 Starting multiev System..."

# # ── ML Service ─────────────────────────────
# echo "🧠 Starting ML service..."
# cd ml_service/fastApi
# ~/.pyenv/versions/3.12.2/envs/myenv312/bin/python -m uvicorn app:app --port 8000  &
# ML_PID=$!
# cd ../../

# # ── Backend ───────────────────────────────
# echo "🔧 Starting Backend..."

# export NVM_DIR="$HOME/.nvm"
# source "$NVM_DIR/nvm.sh"
# nvm use 20

# cd Backend
# nodemon server.js &
# BACKEND_PID=$!
# cd ..

# # ── Frontend ──────────────────────────────
# echo "🎨 Starting Frontend..."
# npm start &
# FRONTEND_PID=$!
# cd ..

# # ── Cleanup ───────────────────────────────
# trap "echo '🛑 Stopping all services...'; kill $ML_PID $BACKEND_PID $FRONTEND_PID" EXIT

# wait

#!/bin/bash

set -e

echo "🚀 Starting multiev System..."

# ── ML Service ─────────────────────────────
echo "🧠 Starting ML service..."
cd ml_service/fastApi
KMP_DUPLICATE_LIB_OK=TRUE OMP_NUM_THREADS=1 MKL_NUM_THREADS=1 ~/.pyenv/versions/3.12.2/envs/myenv312/bin/python -m uvicorn app:app --port 8000 --reload &
ML_PID=$!
cd ../../

# ── Backend ───────────────────────────────
echo "🔧 Starting Backend..."

export NVM_DIR="$HOME/.nvm"
source "$NVM_DIR/nvm.sh"
nvm use 20

cd Backend
nodemon server.js &
BACKEND_PID=$!
cd ..

# ── Frontend ──────────────────────────────
echo "🎨 Starting Frontend..."
npm start &
FRONTEND_PID=$!
cd ..

# ── Cleanup ───────────────────────────────
trap "echo '🛑 Stopping all services...'; kill $ML_PID $BACKEND_PID $FRONTEND_PID" EXIT

wait